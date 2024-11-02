import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private access_token = localStorage.getItem("access_token");

  constructor(private navigator: Router) {}

  ngOnInit(): void {
    if (this.access_token == null) {
      this.navigator.navigate(['login']);
    }
  }
}
