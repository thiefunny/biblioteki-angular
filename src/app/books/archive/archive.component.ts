import { Component, inject } from '@angular/core';
import { BookService } from '../../shared/book.service';
import { Book } from '../../shared/book.interface';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent {

  bookService = inject(BookService);
  router = inject(Router);
  subscriptions: Subscription = new Subscription();

  get books(): Book[] {
    return this.bookService.returned;
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
