import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Book } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {
  subscriptions: Subscription = new Subscription();

  @Input() books: Book[] = [];

  constructor(
    private bookService: BookService,
    // private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

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
