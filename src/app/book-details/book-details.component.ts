import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BookService } from 'src/app/shared/book.service';
import { Book } from '../shared/book.interface';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  books = this.bookService.books;
  bookId = this.route.snapshot.params['bookId'];

  constructor(private bookService: BookService, private route: ActivatedRoute) {
    this.book = this.books[this.bookId - 1];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['bookId'] - 1;
      this.bookService.getBooks().subscribe((books: Book[]) => {
        this.book = books[id];
      });
    });
  }
}
