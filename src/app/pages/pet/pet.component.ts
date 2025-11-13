import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsService } from '../../services/pets/pets.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PetResponse } from '../../models/PetResponse';
import { Button } from 'primeng/button';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { GoBackButtonComponent } from '../../shared/go-back-button/go-back-button.component';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { MessageHandlerService } from '../../shared/message-handler/message-handler.service';

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
export class PetComponent implements OnInit, AfterViewInit {

  private petId: string = '';
  petData?: PetResponse;
  private petService: PetsService = inject(PetsService);
  private messageHandler = inject(MessageHandlerService);

  constructor(private route: ActivatedRoute, private navigator: Router) {
    this.route.queryParams.subscribe(params => {
      this.petId = params['petId'];
    });
  }

  ngOnInit() {
    this.getPet();
  }

  ngAfterViewInit() {
    this.messageHandler.handleNavigationMessage();
  }

  getPet(): void {
    this.petService.getPetById(this.petId).subscribe({
      next: response => {
        console.log(response);
        this.petData = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  handleEditPet() {
    this.navigator.navigate(['pets/edit/'], {
      queryParams: {
        petId: this.petId
      }
    });
  }
}
