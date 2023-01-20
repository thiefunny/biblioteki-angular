import { Injectable, inject } from '@angular/core';
import { Book } from 'src/app/shared/book.class';
import { BookAttrs, Library } from '../../shared/book.interface';
import { BookService } from '../../shared/book.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  bookService = inject(BookService);

  libraryFilters: Library[] = [];
  libraryFiltersSelected: Library[] = [];

  filteredBooks(): BookAttrs[] {
    const filtersIds: (number | string)[] = [];
    this.libraryFiltersSelected.forEach((filter) => filtersIds.push(filter.id));

    return this.bookService.books.filter((book: BookAttrs) =>
      filtersIds.includes(book.libraryId)
    );
  }
}
