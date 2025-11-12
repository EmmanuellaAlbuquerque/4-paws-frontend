import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileResponse } from '../../models/ProfileResponse';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { GoBackButtonComponent } from '../../shared/go-back-button/go-back-button.component';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ButtonModule,
    GoBackButtonComponent,
    AvatarModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  profile: ProfileResponse | null = null;
  private profileService: ProfileService = inject(ProfileService);
  private authService: AuthService = inject(AuthService);
  private navigator: Router = inject(Router);

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      {
        next: (response) => {
          this.profile = response;
          console.log(this.profile);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      }
    );
  }

  handleLogout(): void {
    this.authService.logout();
  }
}
