import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenResponse } from '../models/TokenResponse';
import { LoginRequest } from '../models/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.fourPawsApi;
  }

  getToken(loginRequest: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.baseUrl + 'api/v1/auth/login', loginRequest);
  }
}
