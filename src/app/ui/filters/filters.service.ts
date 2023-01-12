import { Injectable, inject } from '@angular/core';
import { IdCard, Library } from '../../shared/book.interface';
import { BookService } from '../../shared/book.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  bookService = inject(BookService)

  libraryFilters: Library[] = [];
  libraryFiltersSelected: number[] = [];
  idCardFilters: IdCard[] = [];

  initFiltersSelection() {
    this.libraryFilters.forEach((filter) =>
      this.libraryFiltersSelected.push(filter.id)
    );
    console.log(this.libraryFiltersSelected);
  }

  getLibraryFilters(): void {
    this.bookService.getLibraries().subscribe((libraries) => {
      this.libraryFilters = libraries;
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
      this.libraryFiltersSelected.includes(book.libraryId)
    );
  }

  onFiltering(event: boolean, filterCode: number) {
    if (event) {
      this.libraryFiltersSelected.push(filterCode);
    } else {
      const indexOfRemovedFilter =
        this.libraryFiltersSelected.indexOf(filterCode);
      this.libraryFiltersSelected.splice(indexOfRemovedFilter, 1);
    }
    console.log(this.libraryFiltersSelected);
  }




}
