import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { HomeContentComponent } from '../../interfaces/home-content-component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TutorsService } from '../../services/tutors/tutors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Messages, MessagesModule } from 'primeng/messages';
import { Message, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageStatus } from '../../models/MessageStatus';
import { LocationStrategy } from '@angular/common';
import { MessageServiceState } from '../../models/MessageServiceState';

@Component({
  selector: 'app-receptionist-home-content',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    MessagesModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './receptionist-home-content.component.html',
  styleUrl: './receptionist-home-content.component.scss'
})
export class ReceptionistHomeContentComponent implements HomeContentComponent, OnInit, AfterViewInit {

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

  constructor(private messageService: MessageService, private location: LocationStrategy) {}

  ngOnInit(): void {
    this.loadContent();
  }

  ngAfterViewInit() {
    const state = this.location.getState();

    if (state && (state as MessageServiceState)) {

      const statusResponse = state as MessageServiceState;
      const message: MessageStatus = statusResponse.message;

      if (message.content.length > 0) {
        console.log(message);
        this.messageService.add(
          {
            severity: message.status,
            summary: message.summary?.toUpperCase(),
            detail: message.content
          });
      }
    }
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
