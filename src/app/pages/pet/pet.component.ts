import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsService } from '../../services/pets/pets.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PetResponse } from '../../models/PetResponse';
import { Button } from 'primeng/button';
import { Location, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { GoBackButtonComponent } from '../../shared/go-back-button/go-back-button.component';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    Button,
    UpperCasePipe,
    GoBackButtonComponent,
    CardModule,
    TitleCasePipe,
    MenubarModule
  ],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.scss'
})
export class PetComponent implements OnInit {

  private petId: string = '';
  petData?: PetResponse;
  private petService: PetsService = inject(PetsService);
  items: MenuItem[] | undefined;

  constructor(private route: ActivatedRoute, private location: Location) {
    this.route.queryParams.subscribe(params => {
      this.petId = params['petId'];
    });
  }

  ngOnInit() {
    this.getPet();
  }

  getPet(): void {
    this.petService.getPetById(this.petId).subscribe({
      next: response => {
        console.log(response);
        this.petData = response;
        this.initializeMenu();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  private initializeMenu() {
    this.items = [
      {
        label: 'Voltar',
        icon: 'pi pi-arrow-left',
        command: () => {
          this.location.back();
        }
      },
      {
        label: 'Cadastrar Consulta',
        icon: 'pi pi-calendar-plus',
        routerLink: '/appointments',
        queryParams: {
          petId: this.petData?.id,
          tutorId: this.petData?.tutorId
        },
        queryParamsHandling: 'replace'
      },
      {
        label: 'Editar Dados',
        icon: 'pi pi-star',
        routerLink: '/pets/edit',
        queryParamsHandling: 'preserve'
      }
    ];
  }
}
