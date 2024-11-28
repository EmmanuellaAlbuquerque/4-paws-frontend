import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TutorsService } from '../../services/tutors/tutors.service';
import { Tutor } from '../../models/Tutor';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tutors-list',
  standalone: true,
  imports: [
    Button,
    TableModule
  ],
  templateUrl: './tutors-list.component.html',
  styleUrl: './tutors-list.component.scss'
})
export class TutorsListComponent implements OnInit {

  first = 0;
  rows = 10;
  page: number = 0;
  totalRecords = 0;

  tutors: Tutor[] = [];
  private tutorsService: TutorsService = inject(TutorsService);

  ngOnInit() {
    this.loadTutorsPagination(0);
    this.loadTutorsPagination(1);
  }

  loadTutorsPagination(page: number) {
    console.log('total:', this.totalRecords);
    console.log('pages:', (page * this.rows));
    console.log(this.totalRecords > 0 && (page * this.rows) >= this.totalRecords);
    if (this.totalRecords > 0 && (page * this.rows) >= this.totalRecords) {
      return;
    }

    this.tutorsService.getTutorsList(page).subscribe({
      next: response => {
        console.log(response);
        const newPage: Tutor[] = response._embedded.tutorsDTOList;
        this.tutors = [...this.tutors, ...newPage];
        this.totalRecords = response.page.totalElements;
        console.log(this.tutors);
        this.page += 1;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  next() {
    if (!this.isLastPage()) {
      this.first = this.first + this.rows;
      this.loadTutorsPagination(this.page);
    }
  }

  prev() {
    this.first = this.first - this.rows;
  }

  pageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.tutors ? this.first === this.tutors.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.tutors ? this.first === 0 : true;
  }
}
