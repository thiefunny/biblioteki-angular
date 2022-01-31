import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books = this.database.books;
  constructor(private bookService: BookService, private database: DatabaseService ) {}

  ngOnInit(): void {}
}
