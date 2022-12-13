import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BookService } from 'src/app/shared/book.service';
import { Book } from '../shared/book.interface';
import { BookModel } from '../shared/book.model';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  books = this.bookService.books;
  book: Book;
  bookId = this.route.snapshot.params['bookId'];

  constructor(
    private bookService: BookService,
    private database: DatabaseService,
    private route: ActivatedRoute
  ) {
    this.book = this.books[this.bookId-1];
    // console.log(this.route)
  }

  ngOnInit(): void {
    // this.book = this.books[this.route.snapshot.params['bookId']];
    this.route.params.subscribe((params: Params) => {
      this.book = this.books[params['bookId']-1];
    });
  }
}
