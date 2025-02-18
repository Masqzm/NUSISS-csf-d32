import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor() {
    console.info('in constructor')
  }

  ngOnInit(): void {
    console.info('>>> in ngOnInit')

    // Create form group
    this.form = this.fb.group({
      // Declare form controls & init them
      taskName: this.fb.control<string>(''),
      dueDate: this.fb.control<string>(''),
      priority: this.fb.control<string>('med')
    })
  }

  protected processForm() {
    // Auto binding to model (assuming model shares exact naming with form)
    const values: Task = this.form.value

    // Manual binding to model
    // const values: Task = {
    //   taskName: this.form.controls['taskName'].value,
    //   dueDate: this.form.controls['dueDate'].value,
    //   priority: this.form.controls['priority'].value,
    // }

    console.info('>>> values: ', values)

    this.form.reset()
  }
}
