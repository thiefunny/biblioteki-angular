import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books = this.database.books;
  constructor(
    private bookService: BookService,
    private database: DatabaseService
  ) {}

  archiveBook(book: Book) {
    book.returned = true;
  }

  ngOnInit(): void {}
}
