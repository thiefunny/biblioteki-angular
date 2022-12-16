import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  archiveBook(book: Book) {
    this.bookService.archiveBook(book);
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.bookService.books = books;
      this.books = this.bookService.books;
    });
    this.router.events.subscribe(() => {
      this.bookService.getBooks().subscribe((books: Book[]) => {
        this.bookService.books = books;
        this.books = this.bookService.books;
      });

      console.log('router change');
      console.log(this.books);
    });
    // this.bookService.getBooks(); - dlaczego to nie działa?
    // console.log(this.books);
  }
}
