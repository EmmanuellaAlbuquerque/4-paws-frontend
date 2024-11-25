import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PetResponse } from '../../models/PetResponse';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  getPetById(petId: string): Observable<PetResponse> {
    return this.http.get<PetResponse>(this.baseUrl + `api/v1/pets/${petId}`);
  }
}
