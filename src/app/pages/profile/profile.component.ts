import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileResponse } from '../../models/ProfileResponse';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  profile: ProfileResponse | null = null;
  private profileService: ProfileService = inject(ProfileService);

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
}
