import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book, EDepartment } from '../shared/book.interface';
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
  route = inject(ActivatedRoute);
  department = EDepartment;

  @Input() currentDepartment:
    | EDepartment.onloan
    | EDepartment.archive
    | undefined;

  ngOnInit(): void {
    const _route = this.router.url;
    console.log(_route);

    this.bookService.getBooks(_route).subscribe((books: Book[]) => {
      this.bookService.books = books;
      console.log(books);
    });
  }

  transfer(book: Book) {
    switch (this.currentDepartment) {
      case EDepartment.onloan:
        {
          book.returned = true;
          this.bookService.saveBook(book).subscribe({
            next: () => {},
          });
        }
        break;
      case EDepartment.archive:
        {
          book.returned = false;
          this.bookService.saveBook(book).subscribe({
            next: () => {},
          });
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
    this.subscriptions.unsubscribe();
  }
}
