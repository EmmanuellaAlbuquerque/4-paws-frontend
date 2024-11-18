import { Component, inject, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileResponse } from '../../models/ProfileResponse';
import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import { RoleComponentMappingService } from '../../services/role-component-mapping/role-component-mapping.service';
import { HomeContentComponent } from '../../interfaces/home-content-component';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TitleCasePipe,
    NgComponentOutlet,
    ImageModule,
    AvatarModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  profile: ProfileResponse | null = null;
  private profileService: ProfileService = inject(ProfileService);
  homeContentComponentByRole: Type<HomeContentComponent> | null = null;

  constructor(
    private navigator: Router,
    private roleMapService: RoleComponentMappingService
  ) {}

  ngOnInit(): void {
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

  handleProfileClick(): void {
    this.navigator.navigate(['profile']);
  }
}
