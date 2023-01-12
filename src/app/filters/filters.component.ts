import { Component, inject } from '@angular/core';
import { IdCard, Library } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { FilterService } from './filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  bookService = inject(BookService);
  filterService = inject(FilterService)

  initFiltersSelection() {
    this.filterService.libraryFilters.forEach((filter) =>
      this.filterService.libraryFiltersSelected.push(filter.id)
    );
    console.log(this.filterService.libraryFiltersSelected);
  }

  getLibraryFilters(): void {
    this.bookService.getLibraries().subscribe((libraries) => {
      this.filterService.libraryFilters = libraries;
      this.initFiltersSelection();
    });
  }

  // getIdCardFilters(): void {
  //   this.bookService.getIdCards().subscribe((idCards) => {
  //     this.idCardFilters = idCards;
  //   });
  // }

  get filteredBooks() {
    return this.bookService.books.filter((book) =>
      this.filterService.libraryFiltersSelected.includes(book.libraryId)
    );
  }

  onFiltering(event: boolean, filterCode: number) {
    if (event) {
      this.filterService.libraryFiltersSelected.push(filterCode);
    } else {
      const indexOfRemovedFilter =
        this.filterService.libraryFiltersSelected.indexOf(filterCode);
      this.filterService.libraryFiltersSelected.splice(indexOfRemovedFilter, 1);
    }
    console.log(this.filterService.libraryFiltersSelected);
  }
}
