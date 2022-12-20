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
    private bookService: BookService
  ) // private activatedRoute: ActivatedRoute,rout
  // private router: Router
  {}

  archiveBook(book: Book) {
    book.returned = true;
    this.bookService.archiveBook(book).subscribe({
      next: () => {},
    });
  }
}
