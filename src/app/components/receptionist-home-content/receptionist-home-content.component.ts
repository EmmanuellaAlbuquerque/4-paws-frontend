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
import { TableModule } from 'primeng/table';
import { TutorsListResponse } from '../../models/TutorsListResponse';
import { Tutor } from '../../models/Tutor';

@Component({
  selector: 'app-receptionist-home-content',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    TableModule
  ],
  providers: [MessageService],
  templateUrl: './receptionist-home-content.component.html',
  styleUrl: './receptionist-home-content.component.scss'
})
export class ReceptionistHomeContentComponent implements HomeContentComponent, OnInit, AfterViewInit {

  first = 0;
  rows = 10;
  page: number = 0;
  totalRecords = 0;

  tutorCPF: string = '';
  tutors: Tutor[] = [];
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

    this.loadTutorsPagination(0);
    this.loadTutorsPagination(1);
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

  loadTutorsPagination(page: number) {
    console.log('total:', this.totalRecords);
    console.log('pages:', (page * this.rows));
    console.log(this.totalRecords > 0 && (page * this.rows) >= this.totalRecords);
    if (this.totalRecords > 0 && (page * this.rows) >= this.totalRecords) {
      return;
    }

    this.tutorsService.getTutorsList(page).subscribe({
      next: response => {
        console.log(response);
        const newPage: Tutor[] = response._embedded.tutorsDTOList;
        this.tutors = [...this.tutors, ...newPage];
        this.totalRecords = response.page.totalElements;
        console.log(this.tutors);
        this.page += 1;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  handleRegisterTutorClick(): void {
    this.navigator.navigate([`/tutors/new`]);
  }

  next() {
    if (!this.isLastPage()) {
      this.first = this.first + this.rows;
      this.loadTutorsPagination(this.page);
    }
  }

  prev() {
    this.first = this.first - this.rows;
  }

  pageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.tutors ? this.first === this.tutors.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.tutors ? this.first === 0 : true;
  }
}
