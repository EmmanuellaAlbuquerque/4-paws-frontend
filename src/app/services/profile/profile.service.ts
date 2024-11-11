import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ProfileResponse } from '../../models/ProfileResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(this.baseUrl + 'api/v1/profile');
  }
}
