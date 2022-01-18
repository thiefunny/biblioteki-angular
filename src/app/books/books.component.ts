import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books = this.bookService.books;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {}
}
