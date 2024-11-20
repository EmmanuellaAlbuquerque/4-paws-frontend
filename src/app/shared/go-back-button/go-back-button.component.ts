import { Component, inject, Input } from '@angular/core';
import { Button } from "primeng/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-back-button',
  standalone: true,
    imports: [
        Button
    ],
  templateUrl: './go-back-button.component.html',
  styleUrl: './go-back-button.component.scss'
})
export class GoBackButtonComponent {

  @Input() path: string = '/';
  private navigator: Router = inject(Router);

  handleGoBack(): void {
    this.navigator.navigate([this.path]);
  }
}
