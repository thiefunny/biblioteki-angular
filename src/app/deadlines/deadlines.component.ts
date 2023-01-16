import { Component, OnInit, inject } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { sortBy } from 'lodash';
import { Subscription } from 'rxjs';
import { BookAttrs } from '../shared/book.interface';

@Component({
  selector: 'app-deadlines',
  templateUrl: './deadlines.component.html',
  styleUrls: ['./deadlines.component.scss'],
})
export class DeadlinesComponent implements OnInit {
  subscriptions = new Subscription();
  bookService = inject(BookService);
  sortedBooks: BookAttrs[] = [];

  ngOnInit(): void {
    // this.subscriptions.add(
    //   this.bookService.getBooks('/onloan').subscribe({
    //     next: (books) => {
    //       this.sortedBooks = sortBy(books, ['returnDate']);
    //     },
    //   })
    // );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
