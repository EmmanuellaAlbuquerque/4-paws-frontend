import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsService } from '../../services/pets/pets.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PetResponse } from '../../models/PetResponse';
import { Button } from 'primeng/button';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { GoBackButtonComponent } from '../../shared/go-back-button/go-back-button.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    Button,
    UpperCasePipe,
    GoBackButtonComponent,
    CardModule,
    TitleCasePipe
  ],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.scss'
})
export class PetComponent implements OnInit {

  private petId: string = '';
  petData?: PetResponse;
  private petService: PetsService = inject(PetsService);

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.petId = params['petId'];
    });
  }

  ngOnInit() {
    this.getPet();
  }

  getPet(): void {
    this.petService.getPetById(this.petId).subscribe({
      next: response => {
        console.log(response);
        this.petData = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }
}
