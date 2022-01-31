import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  books = this.database.books;

  constructor(private bookService: BookService, private database: DatabaseService) {}

  ngOnInit(): void {}
}
