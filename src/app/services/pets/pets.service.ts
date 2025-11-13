import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PetResponse } from '../../models/PetResponse';
import { PetRequest } from '../../models/PetRequest';

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

  newPet(newPetRequest: PetRequest) {
    return this.http.post<void>(this.baseUrl + 'api/v1/pets/new', newPetRequest, {
      observe: 'response'
    });
  }

  editPet(editPetRequest: PetRequest, petId: string) {
    return this.http.put<void>(this.baseUrl + `api/v1/pets/${petId}`, editPetRequest, {
      observe: 'response'
    });
  }
}
