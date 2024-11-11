import { Component, OnInit } from '@angular/core';
import { HomeContentComponent } from '../../interfaces/home-content-component';

@Component({
  selector: 'app-veterinarian-home-content',
  standalone: true,
  imports: [],
  templateUrl: './veterinarian-home-content.component.html',
  styleUrl: './veterinarian-home-content.component.scss'
})
export class VeterinarianHomeContentComponent implements HomeContentComponent, OnInit {

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    console.log('Load Content VETERINARIAN');
  }

}
