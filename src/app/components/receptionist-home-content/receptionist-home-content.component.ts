import { Component, OnInit } from '@angular/core';
import { HomeContentComponent } from '../../interfaces/home-content-component';

@Component({
  selector: 'app-receptionist-home-content',
  standalone: true,
  imports: [],
  templateUrl: './receptionist-home-content.component.html',
  styleUrl: './receptionist-home-content.component.scss'
})
export class ReceptionistHomeContentComponent implements HomeContentComponent, OnInit {

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    console.log('Load Content RECEPTIONIST');
  }

}
