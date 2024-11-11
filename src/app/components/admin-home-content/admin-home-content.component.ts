import { Component, OnInit } from '@angular/core';
import { HomeContentComponent } from '../../interfaces/home-content-component';

@Component({
  selector: 'app-admin-home-content',
  standalone: true,
  imports: [],
  templateUrl: './admin-home-content.component.html',
  styleUrl: './admin-home-content.component.scss'
})
export class AdminHomeContentComponent implements HomeContentComponent, OnInit {

  ngOnInit(): void {
    this.loadContent();
  }

  loadContent(): void {
    console.log('Load Content ADMIN');
  }

}
