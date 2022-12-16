import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../shared/book.interface';
import { BookService } from '../shared/book.service';

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
    });
    // this.bookService.getBooks(); - dlaczego to nie działa?
  }
}
