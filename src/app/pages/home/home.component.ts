import { Component, inject, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileResponse } from '../../models/ProfileResponse';
import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import { RoleComponentMappingService } from '../../services/role-component-mapping.service';
import { HomeContentComponent } from '../../interfaces/home-content-component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TitleCasePipe,
    NgComponentOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  profile: ProfileResponse | null = null;
  private profileService: ProfileService = inject(ProfileService);
  private access_token = localStorage.getItem("access_token");
  homeContentComponentByRole: Type<HomeContentComponent> | null = null;

  constructor(
    private navigator: Router,
    private roleMapService: RoleComponentMappingService
  ) {}

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
          this.profile = response;
          console.log(this.profile);
          this.homeContentComponentByRole = this.roleMapService.getComponentForRole(this.profile.role);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      }
    );
  }
}
