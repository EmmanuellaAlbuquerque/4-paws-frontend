import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TutorSearchResponse } from '../../models/TutorSearchResponse';

@Injectable({
  providedIn: 'root'
})
export class TutorsService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  getTutorByCPF(tutorCpf: string): Observable<TutorSearchResponse> {
    return this.http.get<TutorSearchResponse>(this.baseUrl + `api/v1/tutors/by-cpf?tutorCpf=${tutorCpf}`);
  }

  tutorExistsByCPF(tutorCpf: string): Observable<HttpResponse<void>> {
    return this.http.get<void>(this.baseUrl + `api/v1/tutors/exists-by-cpf?tutorCpf=${tutorCpf}`, {
      observe: 'response'
    });
  }
}
