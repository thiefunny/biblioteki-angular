import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book, Department, EDepartment } from '../shared/book.interface';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {
  subscriptions: Subscription = new Subscription();
  bookService = inject(BookService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  department = EDepartment;
  _route = this.router.url;

  @Input() currentDepartment: Department = EDepartment.onloan;

  ngOnInit(): void {
    let department = '';
    this.activatedRoute.url.subscribe((url) => department = url[0].path);
    this.bookService.getBooks(`/${department}`).subscribe((books: Book[]) => {
      this.bookService.books = books;
    });
  }

  transfer(book: Book) {
    switch (this._route.slice(1)) {
      case EDepartment.onloan:
        {
          this.bookService.saveBook(book, EDepartment.archive).subscribe();
        }
        break;
      case EDepartment.archive:
        {
          this.bookService.saveBook(book, EDepartment.onloan).subscribe();
        }
        break;
    }
  }

  get targetDepartment(): EDepartment | string | undefined {
    return this.currentDepartment === EDepartment.onloan
      ? EDepartment.archive
      : EDepartment.onloan.slice(0, -1);
  }

  get books(): Book[] {
    return this.bookService.books;
  }

  ngOnDestroy() {
    // dlaczego tu działa unsubcribe on Destroy, skoro nie zostaje przeładowany komponent?
    // this.subscriptions.unsubscribe();
  }
}
