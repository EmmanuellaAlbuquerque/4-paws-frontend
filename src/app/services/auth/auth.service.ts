import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenResponse } from '../../models/TokenResponse';
import { LoginRequest } from '../../models/LoginRequest';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, private navigator: Router) {
    this.baseUrl = environment.api;
  }

  login(loginRequest: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.baseUrl + 'api/v1/auth/login', loginRequest);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.navigator.navigate(['/login']);
  }
}
