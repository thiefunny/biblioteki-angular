import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  Router,
  Scroll,
  UrlSegment,
} from '@angular/router';
import { BookService } from 'src/app/shared/book.service';
import { BookAttrs } from '../shared/book.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();

  book: BookAttrs | undefined;
  books = this.bookService.books;
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  bookId = this.activatedRoute.snapshot.params['bookId'];
  _route = this.router.url;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService
      .getBook(this.router.url)
      .subscribe((book) => (this.book = book));

    this.activatedRoute.params.subscribe(() => {
      this.bookService.getBook(this.router.url).subscribe((book: BookAttrs) => {
        this.book = book;
      });
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
