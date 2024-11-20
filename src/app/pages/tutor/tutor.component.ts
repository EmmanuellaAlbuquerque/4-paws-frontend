import { Component, inject, OnInit } from '@angular/core';
import { TutorsService } from '../../services/tutors/tutors.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { GoBackButtonComponent } from '../../shared/go-back-button/go-back-button.component';
import { TutorSearchResponse } from '../../models/TutorSearchResponse';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-tutor',
  standalone: true,
  imports: [
    GoBackButtonComponent,
    Button
  ],
  templateUrl: './tutor.component.html',
  styleUrl: './tutor.component.scss'
})
export class TutorComponent implements OnInit {
  private cpf: string = '';
  tutorData?: TutorSearchResponse;
  private tutorService: TutorsService = inject(TutorsService);

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.cpf = params['cpf'];
    })
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
}
