import { Injectable, Type } from '@angular/core';
import { AdminHomeContentComponent } from '../../components/admin-home-content/admin-home-content.component';
import { ReceptionistHomeContentComponent } from '../../components/receptionist-home-content/receptionist-home-content.component';
import { VeterinarianHomeContentComponent } from '../../components/veterinarian-home-content/veterinarian-home-content.component';
import { HomeContentComponent } from '../../interfaces/home-content-component';
import { RoleComponentMap } from '../../models/RoleComponentMap';

@Injectable({
  providedIn: 'root'
})
export class RoleComponentMappingService {

  private roleComponentMap: RoleComponentMap = {
    'ADMIN': AdminHomeContentComponent,
    'RECEPCIONISTA': ReceptionistHomeContentComponent,
    'VETERINARIO': VeterinarianHomeContentComponent
  }

  constructor() { }

  getComponentForRole(role: string): Type<HomeContentComponent> {
    return this.roleComponentMap[role];
  }
}
