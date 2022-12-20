import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Book } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { Subscription } from 'rxjs';
// import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  subscriptions: Subscription = new Subscription();

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  get books(): Book[] {
    return this.activatedRoute.snapshot.url[0].path === 'books'
      ? this.bookService.books.filter((book) => !book.returned)
      : this.bookService.books.filter((book) => book.returned);
  }

  archiveBook(book: Book) {
    book.returned = true;
    this.bookService.archiveBook(book).subscribe({
      next: () => {},
    });
  }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.bookService.books = books;
    });
    this.subscriptions = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.bookService.getBooks().subscribe((books: Book[]) => {
          this.bookService.books = books;
        });
    });
    // this.bookService.getBooks(); - dlaczego to nie działa?
  }
  ngOnDestroy() {
    // dlaczego tu działa unsubcribe on Destroy, skoro nie zostaje przeładowany komponent?
    this.subscriptions.unsubscribe();
  }
}
