import { Component, inject, Input } from '@angular/core';
import { Button } from "primeng/button";
import { Router } from '@angular/router';
import { Location } from '@angular/common'

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
  @Input() goBack: boolean = false;
  private navigator: Router = inject(Router);

  constructor(private location: Location) {}

  handleGoBack(): void {
    if (this.goBack) {
      this.location.back();
    }
    else {
      this.navigator.navigate([this.path]);
    }
  }
}
