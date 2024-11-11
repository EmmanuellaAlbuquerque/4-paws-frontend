import { Type } from '@angular/core';
import { HomeContentComponent } from '../interfaces/home-content-component';

export type RoleComponentMap = {
  [role: string]: Type<HomeContentComponent>
}
