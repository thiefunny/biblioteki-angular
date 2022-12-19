import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Book } from '../shared/book.interface';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  constructor(
    private bookService: BookService,
    // private archive: ActivatedRouteSnapshot,
    private router: Router
  ) {}

  get books(): Book[] {
    console.log(this.router.url);
    console.log(this.bookService.books);

    console.log(
      this.bookService.books.filter((book) => book.returned === true)
    );

    return this.router.url === '/books'
      ? this.bookService.books.filter((book) => !book.returned)
      : this.bookService.books.filter((book) => book.returned);
  }

  archiveBook(book: Book) {
    book.returned = true;
    this.bookService.archiveBook(book).subscribe({
      next: () => {
        // console.log('nininini');
      },
    });
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.bookService.books = books;
    });
    // this.router.events.subscribe(() => {
    //   this.bookService.getBooks().subscribe((books: Book[]) => {
    //     this.bookService.books = books;
    //   });
    // });
    // this.bookService.getBooks(); - dlaczego to nie działa?
  }
}
