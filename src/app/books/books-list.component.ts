import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sortBy } from 'lodash';
import { Subscription } from 'rxjs';
import { BookAttrs, Department, EDepartment } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { FilterService } from '../ui/filters/filters.service';
import { SortingService } from '../ui/sorting/sorting.service';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {
  dbService = inject(DatabaseService);
  filterService = inject(FilterService);
  sortingService = inject(SortingService);
  bookService = inject(BookService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  cd = inject(ChangeDetectorRef);

  subscriptions: Subscription = new Subscription();
  department = '';

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.url.subscribe((url) => {
        this.department = url[0].path;
        this.dbService.getBooks(this.department);
      })
    );
  }

  get transferCopy(): string {
    return this.department === EDepartment.onloan
      ? 'Oddaj książkę'
      : 'Wypożycz ponownie';
  }

  get books(): BookAttrs[] {
    return this.bookService.books;
    // return sortBy(this.filterService.filteredBooks(), [
    //   this.sortingService.sortingOption,
    // ]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // HELPERS

  numberToString(input: number) {
    return input.toString();
  }
}
