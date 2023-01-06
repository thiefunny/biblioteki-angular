import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookAttrs, Department, EDepartment } from '../shared/book.interface';
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
  department = '';
  cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.url.subscribe(
        (url) => (this.department = url[0].path)
      )
    );
    this.subscriptions.add(
      this.bookService
        .getBooks(`/${this.department}`)
        .subscribe((books: BookAttrs[]) => {
          this.bookService.books = books;
        })
    );
  }

  _transfer(book: BookAttrs, toDepartment: Department, fromDepartment: Department) {
    this.subscriptions.add(
      this.bookService.saveBook(book, toDepartment).subscribe({
        next: () => console.log(`zapamietane w ${toDepartment}`),
        error: () => console.log(`nie zapamietane ${toDepartment}`),
      })
    );
    this.subscriptions.add(
      this.bookService.deleteBook(book, fromDepartment).subscribe({
        next: () => {
          console.log(`skasowane z ${fromDepartment}`);
          this.bookService.books.splice(
            this.bookService.books.indexOf(book),
            1
          );
        },
        error: () => {
          console.log(`nie skasowane z ${fromDepartment}`);
        },
      })
    );
  }

  transfer(book: BookAttrs) {
    switch (this.department) {
      case EDepartment.onloan:
        this._transfer(book, EDepartment.archive, EDepartment.onloan);
        break;
      case EDepartment.archive:
        this._transfer(book, EDepartment.onloan, EDepartment.archive);
        break;
    }
  }

  get transferCopy(): string {
    return this.department === EDepartment.onloan
      ? 'Oddaj książkę'
      : 'Wypożycz ponownie';
  }

  get books(): BookAttrs[] {
    return this.bookService.books;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
