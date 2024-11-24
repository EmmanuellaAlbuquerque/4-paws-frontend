import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TutorComponent } from './pages/tutor/tutor.component';
import { PetComponent } from './pages/pet/pet.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'tutors',
    component: TutorComponent
  },
  {
    path: 'pets',
    component: PetComponent
  },
  //** THE ORDER MATTERS **(ALL OTHER ROUTES) SHOULD BE AT THE END **//
  {
    path: '**', // ** should be the last route in the list
    redirectTo: 'not-found',
  },
];
