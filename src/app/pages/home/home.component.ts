import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileResponse } from '../../models/ProfileResponse';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TitleCasePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  profile: ProfileResponse | null = null;
  private profileService: ProfileService = inject(ProfileService);
  private access_token = localStorage.getItem("access_token");

  constructor(private navigator: Router) {}

  ngOnInit(): void {
    if (this.access_token == null) {
      this.navigator.navigate(['login']);
      return;
    }

    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfile().subscribe(
      {
        next: (response) => {
          console.log(response);
          this.profile = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      }
    );
  }
}
