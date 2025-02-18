import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private fb = inject(FormBuilder)  // inject() is similar to @Autowired
  protected form!: FormGroup        // ! - ignores the need for initialisation
  protected activities!: FormArray
  
  constructor() {
    console.info('in constructor')
  }

  ngOnInit(): void {
    console.info('>>> in ngOnInit')

    this.form = this.createForm()
  }

  private createActivity(): FormGroup {
    // Init new activity group
    return this.fb.group({
      activityName: this.fb.control<string>('', [Validators.required, Validators.minLength(3)])
    })
  }

  private createForm(): FormGroup {   // mtd(): <return type>
    this.activities = this.fb.array([]) // Validators.minLength() wont work for aray
    // Create form group & return it
    return this.fb.group({
      // Declare form controls & array & init them
      taskName: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      dueDate: this.fb.control<string>('', [Validators.required]),
      priority: this.fb.control<string>('med'),
      activities: this.activities
    })
  }

  protected addActivity() {
    // Push activity group into activities array
    this.activities.push(this.createActivity())
  }

  protected delActivity(idx: number) {
    this.activities.removeAt(idx)
  }

  // Overall validator for form
  protected invalid(): boolean {
    return this.form.invalid || this.activities.controls.length <= 0
  }

  protected isCtrlInvalid(ctrlName: string): boolean {
    return !!this.form.get(ctrlName)?.invalid

    // !! fast way to convert type to boolean while retaining its boolean status of actual value
    // ? returns undefined if ctrlName not found
  }

  protected processForm() {
    // Auto binding to model (assuming model shares exact naming with form)
    const values: Task = this.form.value

    // Manual binding to model
    // const values: Task = {
    //   taskName: this.form.controls['taskName'].value,
    //   dueDate: this.form.controls['dueDate'].value,
    //   priority: this.form.controls['priority'].value,
    //   activities: this.form.controls['activites'].value
    // }

    //console.info('>>> values: ', this.form.value)
    console.info('>>> values: ', values)

    //this.form.reset()
  }
}
