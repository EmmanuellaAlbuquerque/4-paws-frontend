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
import { ActivatedRoute, Router } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { TutorSearchResponse } from '../../../models/TutorSearchResponse';
import { EditTutorRequest } from '../../../models/EditTutorRequest';

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
    FloatLabelModule,
    InputMaskModule
  ],
  templateUrl: './tutors-form.component.html',
  styleUrl: './tutors-form.component.scss'
})
export class TutorsFormComponent implements OnInit {

  tutorForm: FormGroup;
  tutorService: TutorsService = inject(TutorsService);
  errors: Error;
  hasAnyErrors: boolean = false;
  protected tutorId: string = '';
  action: string = 'Cadastre';
  buttonAction: string = 'Cadastrar';

  constructor(private fb: FormBuilder, private navigator: Router, private route: ActivatedRoute) {
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

    this.route.queryParams.subscribe(params => {
      this.tutorId = params['tutorId'];
    })
  }

  ngOnInit() {
    if(!(this.tutorId == undefined)) {
      this.loadTutorData();
      this.action = 'Edite';
      this.buttonAction = 'Editar';
    }
  }

  loadTutorData() {
    this.tutorService.getTutorById(this.tutorId).subscribe({
      next: response => {
        console.log(response);

        this.tutorForm.patchValue({
          name: response.name,
          phone: response.phone,
          cpf: response.cpf,
          address: {
            street: response.address.street,
            number: response.address.number,
            neighborhood: response.address.neighborhood,
          },
        });

        this.tutorForm.get('name')?.disable();
        this.tutorForm.get('cpf')?.disable();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onSubmit(): void {
    if (this.tutorForm.valid) {
      if(this.tutorId == undefined) {
        this.saveTutor();
      }
      else {
        this.editTutor();
      }
    }
  }

  saveTutor() {
    const newTutorRequest: NewTutorRequest = this.tutorForm.value;

    this.tutorService.newTutor(newTutorRequest).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.navigator.navigate(['/'], {
            state: {
              message: {
                status: 'success',
                summary: 'sucesso',
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
    );
  }

  editTutor() {
    const editTutorRequest: EditTutorRequest = this.tutorForm.value;

    this.tutorService.editTutor(editTutorRequest, this.tutorId).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.navigator.navigate(['/'], {
            state: {
              message: {
                status: 'success',
                summary: 'sucesso',
                content: 'Tutor editado com sucesso!'
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
    );
  }
}
