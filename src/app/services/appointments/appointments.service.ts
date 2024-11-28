import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AppointmentsListResponse } from '../../models/AppointmentsListResponse';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private readonly baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = environment.api;
  }

  getAllAppointments(): Observable<AppointmentsListResponse> {
    return this.http.get<AppointmentsListResponse>(this.baseURL + 'api/v1/appointments');
  }
}
