import { Component, inject, OnInit } from '@angular/core';
import { TutorsService } from '../../services/tutors/tutors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GoBackButtonComponent } from '../../shared/go-back-button/go-back-button.component';
import { TutorSearchResponse } from '../../models/TutorSearchResponse';
import { Button } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { UpperCasePipe } from '@angular/common';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [
    GoBackButtonComponent,
    Button,
    DividerModule,
    UpperCasePipe,
    ImageModule
  ],
  templateUrl: './tutor.component.html',
  styleUrl: './tutor.component.scss'
})
export class TutorComponent implements OnInit {

  private cpf: string = '';
  tutorData?: TutorSearchResponse;
  private tutorService: TutorsService = inject(TutorsService);
  private navigator: Router = inject(Router);

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.cpf = params['cpf'];
    });
  }

  ngOnInit(): void {
    this.getTutor();
  }

  getTutor(): void {
    this.tutorService.getTutorByCPF(this.cpf).subscribe({
      next: response => {
        console.log(response);
        this.tutorData = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  handleAddPetButton(): void {
    this.navigator.navigate(['pets/new'])
  }

  handlePetClick(petId: string): void {
    this.navigator.navigate([`/pets`], {
      queryParams: {
        petId: petId
      }
    });
  }
}
