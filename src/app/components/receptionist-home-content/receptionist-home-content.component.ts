import { Component, inject, OnInit } from '@angular/core';
import { HomeContentComponent } from '../../interfaces/home-content-component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TutorsService } from '../../services/tutors/tutors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receptionist-home-content',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    MessagesModule
  ],
  templateUrl: './receptionist-home-content.component.html',
  styleUrl: './receptionist-home-content.component.scss'
})
export class ReceptionistHomeContentComponent implements HomeContentComponent, OnInit {

  tutorCPF: string = '';
  tutorResponseErrorStatus: boolean = false;
  errorMessageValue: Message[] = [
    {
      severity: 'error',
      detail: 'Tutor não encontrado! Tente novamente!'
    }
  ];
  private navigator: Router = inject(Router);
  private tutorsService: TutorsService = inject(TutorsService);

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    console.log('Load Content RECEPTIONIST');
  }

  handleTutorSearch(): void {
    this.tutorsService.tutorExistsByCPF(this.tutorCPF).subscribe({
      next: response => {
        console.log(response);
        this.navigator.navigate([`/tutors`], {
          queryParams: {
            cpf: this.tutorCPF
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.tutorResponseErrorStatus = true;
      }
    })
  }

  handleRegisterTutorClick(): void {
    this.navigator.navigate([`/tutors/new`]);
  }
}
