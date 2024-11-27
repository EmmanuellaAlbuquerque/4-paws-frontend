import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-tutors-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    Ripple,
    DividerModule
  ],
  templateUrl: './tutors-form.component.html',
  styleUrl: './tutors-form.component.scss'
})
export class TutorsFormComponent {

  tutorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tutorForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      cpf: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        neighborhood: ['', Validators.required],
      })
    });
  }

  onSubmit(): void {
    if (this.tutorForm.valid) {

    }
  }
}
