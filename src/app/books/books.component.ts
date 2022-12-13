import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  books = this.bookService.books;

  constructor(
    private bookService: BookService,
    private database: DatabaseService
  ) {}

  archiveBook(book: Book) {
    this.bookService.archiveBook(book);
  }

  ngOnInit(): void {
    this.bookService.getBooks();
  }
}
