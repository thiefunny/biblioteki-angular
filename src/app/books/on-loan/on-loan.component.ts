import { Component, Input, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book, EDepartment } from 'src/app/shared/book.interface';
import { BookService } from 'src/app/shared/book.service';

@Component({
  selector: 'app-on-loan',
  templateUrl: './on-loan.component.html',
  styleUrls: ['./on-loan.component.scss'],
})
export class OnLoanComponent {
  bookService = inject(BookService);
  router = inject(Router);
  subscriptions: Subscription = new Subscription();
  department = EDepartment;
  get books(): Book[] {
    return this.bookService.onLoan;
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
