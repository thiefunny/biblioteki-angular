import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';

@Component({
  selector: 'app-deadlines',
  templateUrl: './deadlines.component.html',
  styleUrls: ['./deadlines.component.scss']
})
export class DeadlinesComponent implements OnInit {

    books = this.bookService.books;
    constructor(private bookService: BookService) {}

  ngOnInit(): void {
  }

}
