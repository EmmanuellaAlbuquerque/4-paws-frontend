import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { TutorsService } from '../../../services/tutors/tutors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NewTutorRequest } from '../../../models/NewTutorRequest';
import { ErrorResponse } from '../../../models/ErrorResponse';
import { Error } from '../../../models/Error';
import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-tutors-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    Ripple,
    DividerModule,
    KeyValuePipe,
    TitleCasePipe,
    FloatLabelModule
  ],
  templateUrl: './tutors-form.component.html',
  styleUrl: './tutors-form.component.scss'
})
export class TutorsFormComponent implements OnInit {

  tutorForm: FormGroup;
  tutorService: TutorsService = inject(TutorsService);
  errors: Error;
  hasAnyErrors: boolean = false;

  constructor(private fb: FormBuilder, private navigator: Router) {
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

    this.errors = {};
  }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.tutorForm.valid) {
      const newTutorRequest: NewTutorRequest = this.tutorForm.value;

      this.tutorService.newTutor(newTutorRequest).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.navigator.navigate(['/'], {
              state: {
                message: {
                  status: 'success',
                  content: 'Tutor criado com sucesso!'
                }
              }
            });
          },
          error: (error: HttpErrorResponse) => {
            const errorResponse: ErrorResponse = error.error as ErrorResponse;
            this.errors = errorResponse.errors;
            this.hasAnyErrors = true;
            console.log(errorResponse);
          }
        }
      )
    }
  }
}
