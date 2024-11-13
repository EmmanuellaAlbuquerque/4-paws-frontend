import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../../models/ErrorResponse';
import { Error } from '../../models/Error';
import { LoginRequest } from '../../models/LoginRequest';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeyValuePipe, NgIf, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { IconInputComponent } from '../../components/icon-input/icon-input.component';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    KeyValuePipe,
    TitleCasePipe,
    IconInputComponent,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PasswordModule,
    ImageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  errors: Error;
  hasAnyErrors: boolean = false;
  loading: boolean = false;

  private authService: AuthService = inject(AuthService);

  constructor(private fb: FormBuilder, private navigator: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.errors = {};
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.loading = true;

    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value;
      this.handleLogin(loginRequest);
    }
    else {
      this.loading = false;
    }
  }

  handleLogin(loginRequest: LoginRequest) {
    this.authService.login(loginRequest).subscribe(
      {
        next: (response) => {
          this.loading = false;
          localStorage.setItem('access_token', response.token);
          this.navigator.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          const errorResponse: ErrorResponse = error.error as ErrorResponse;
          this.errors = errorResponse.errors;
          console.log(errorResponse);
          this.hasAnyErrors = true;
          this.loading = false;
        }
      }
    );
  }
}
