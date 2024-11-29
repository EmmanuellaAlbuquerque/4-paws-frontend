import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TutorSearchResponse } from '../../models/TutorSearchResponse';
import { NewTutorRequest } from '../../models/NewTutorRequest';
import { TutorsListResponse } from '../../models/TutorsListResponse';
import { Tutor } from '../../models/Tutor';
import { EditTutorRequest } from '../../models/EditTutorRequest';

@Injectable({
  providedIn: 'root'
})
export class TutorsService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  getTutorById(tutorId: string): Observable<TutorSearchResponse> {
    return this.http.get<TutorSearchResponse>(this.baseUrl + `api/v1/tutors/${tutorId}`);
  }

  getTutorByCPF(tutorCpf: string): Observable<TutorSearchResponse> {
    return this.http.get<TutorSearchResponse>(this.baseUrl + `api/v1/tutors/by-cpf?tutorCpf=${tutorCpf}`);
  }

  getTutorsList(page: number): Observable<TutorsListResponse> {
    return this.http.get<TutorsListResponse>(this.baseUrl + `api/v1/tutors?page=${page}`);
  }

  tutorExistsByCPF(tutorCpf: string): Observable<HttpResponse<void>> {
    return this.http.get<void>(this.baseUrl + `api/v1/tutors/exists-by-cpf?tutorCpf=${tutorCpf}`, {
      observe: 'response'
    });
  }

  newTutor(newTutorRequest: NewTutorRequest) {
    return this.http.post<void>(this.baseUrl + 'api/v1/tutors/new', newTutorRequest, {
      observe: 'response'
    });
  }

  editTutor(editTutorRequest: EditTutorRequest, tutorId: string) {
    return this.http.put<void>(this.baseUrl + `api/v1/tutors/${tutorId}`, editTutorRequest, {
      observe: 'response'
    });
  }
}
