import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { AppointmentsService } from '../../services/appointments/appointments.service';
import { AppointmentMin } from '../../models/AppointmentMin';
import { AppointmentsListResponse } from '../../models/AppointmentsListResponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [
    Button,
    PrimeTemplate,
    TableModule,
    DatePipe
  ],
  templateUrl: './appointments-list.component.html',
  styleUrl: './appointments-list.component.scss'
})
export class AppointmentsListComponent implements OnInit {

  first = 0;
  rows = 0;
  totalRecords = 0;

  appointments: AppointmentsListResponse = [];
  private appointmentsService: AppointmentsService = inject(AppointmentsService);

  ngOnInit() {
    this.loadAppointmentsPagination();
  }

  loadAppointmentsPagination() {
    this.appointmentsService.getAllAppointments().subscribe({
      next: response => {
        this.appointments = response;
        this.totalRecords = this.appointments.length;
        this.rows = this.totalRecords;
        console.log(this.appointments);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  next() {
    if (!this.isLastPage()) {
      this.first = this.first + this.rows;
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
    return this.appointments ? this.first === this.appointments.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.appointments ? this.first === 0 : true;
  }
}
