import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Book, Department, EDepartment } from '../shared/book.interface';
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
  @Input() currentDepartment:
    | EDepartment.rental
    | EDepartment.archive
    | undefined;

  get targetDepartment(): EDepartment | string | undefined {
    return this.currentDepartment === EDepartment.rental
      ? EDepartment.archive
      : EDepartment.rental.slice(0, -1);
  }

  constructor(
    private bookService: BookService
  ) {}

  transfer(book: Book) {
    switch (this.currentDepartment) {
      case EDepartment.rental:
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
}
