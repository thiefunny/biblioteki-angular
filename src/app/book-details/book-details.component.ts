import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  books = this.bookService.books;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}
}
