import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { Error } from '../../../models/Error';
import { PetsService } from '../../../services/pets/pets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { NewPetRequest } from '../../../models/NewPetRequest';
import { CalendarModule } from 'primeng/calendar';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ErrorResponse } from '../../../models/ErrorResponse';

interface Gender {
  name: string;
}

interface Specie {
  name: string;
}

@Component({
  selector: 'app-pets-form',
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
    InputMaskModule,
    DropdownModule,
    FormsModule,
    CalendarModule
  ],
  templateUrl: './pets-form.component.html',
  styleUrl: './pets-form.component.scss'
})
export class PetsFormComponent implements OnInit {

  petForm: FormGroup;
  petService: PetsService = inject(PetsService);
  errors: Error;
  hasAnyErrors: boolean = false;
  protected petId: string = '';
  protected tutorId: string = '';
  action: string = 'Cadastre';
  buttonAction: string = 'Cadastrar';

  genders: Gender[] | undefined;
  species: Specie[] | undefined;

  constructor(private fb: FormBuilder, private navigator: Router, private route: ActivatedRoute) {
    this.petForm = this.fb.group({
      name: ['', Validators.required],
      weight: ['', Validators.required],
      breed: ['', Validators.required],
      birthDate: [null, Validators.required],
      selectedGender: [null, Validators.required],
      selectedSpecie: [null, Validators.required]
    });

    this.errors = {};

    this.route.queryParams.subscribe(params => {
      this.petId = params['petId'];
      this.tutorId = params['tutorId'];
    })
  }

  ngOnInit() {
    if(!(this.petId == undefined)) {
      this.loadPetData();
      this.action = 'Edite';
      this.buttonAction = 'Editar';
    }

    this.genders = [
      { name: 'FEMEA' },
      { name: 'MACHO' }
    ];

    this.species = [
      { name: 'FELINA' },
      { name: 'CANINA' }
    ];
  }

  loadPetData() {
    this.petService.getPetById(this.petId).subscribe({
      next: response => {
        console.log(response);

        this.petForm.patchValue({
          name: response.name,
          weight: response.weight,
          sex: response.sex,
          breed: response.breed,
          specie: response.specie,
          age: response.age
        })
      },
      error: error => {
        console.log(error);
      }
    })
  }

  onSubmit(): void {
    if (this.petForm.valid) {
      if(this.petId == undefined) {
        this.savePet();
      }
      else {
        // this.editPet();
      }
    }
  }

  savePet() {
    const newPetRequest = this.mapToNewPetRequest();
    console.log(newPetRequest);

    this.handleSavePet(
      this.petService.newPet(newPetRequest),
      'Pet criado com sucesso!'
    );
  }

  private mapToNewPetRequest(): NewPetRequest {
    const formValue = this.petForm.value;

    return {
      name: formValue.name,
      weight: formValue.weight,
      breed: formValue.breed,
      birthDate: formValue.birthDate ? new Date(formValue.birthDate).toISOString().split('T')[0] : '',
      sex: formValue.selectedGender?.name ?? '',
      specie: formValue.selectedSpecie?.name ?? '',
      tutorId: this.tutorId
    };
  }

  private handleSavePet(
    serviceMethod: Observable<HttpResponse<void>>,
    successMessage: string
  ) {
    serviceMethod.subscribe({
      next: (response) => {
        console.log(response);

        const locationHeader = response.headers.get('Location');

        if (locationHeader) {
          const petId = this.extractPetIdFromLocation(locationHeader);

          this.navigator.navigate(['pets/'], {
            queryParams: {
              petId: petId
            },
            state: {
              message: {
                status: 'success',
                summary: 'Sucesso',
                content: successMessage
              }
            }
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        const errorResponse: ErrorResponse = error.error as ErrorResponse;
        this.errors = errorResponse.errors;
        this.hasAnyErrors = true;
        console.log(errorResponse);
      }
    });
  }

  private extractPetIdFromLocation(location: string): string {
    const parts = location.split('/');
    return parts[parts.length - 1];
  }
}
