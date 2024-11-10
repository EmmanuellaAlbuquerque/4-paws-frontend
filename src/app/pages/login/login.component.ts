import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../models/ErrorResponse';
import { Error } from '../../models/Error';
import { LoginRequest } from '../../models/LoginRequest';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KeyValuePipe, NgIf, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    KeyValuePipe,
    TitleCasePipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  errors: Error;
  hasAnyErrors: boolean = false;

  private authService: AuthService = inject(AuthService);

  constructor(private fb: FormBuilder, private navigator: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });

    this.errors = {};
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value;
      this.getToken(loginRequest);
    }
  }

  getToken(loginRequest: LoginRequest) {
    this.authService.getToken(loginRequest).subscribe(
      {
        next: (response) => {
          localStorage.setItem('access_token', response.token);
          this.navigator.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          const errorResponse: ErrorResponse = error.error as ErrorResponse;
          this.errors = errorResponse.errors;
          console.log(errorResponse);
          this.hasAnyErrors = true;
        }
      }
    );
  }
}
