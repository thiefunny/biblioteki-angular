import { Component, inject } from '@angular/core';
import { Unsubscribe, onValue } from 'firebase/database';
import { isEqual, sortBy } from 'lodash';
import { Library } from 'src/app/shared/book.interface';
import { BookService } from 'src/app/shared/book.service';
import { DatabaseService } from 'src/app/shared/database.service';
import { FilterService } from './filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  filterService = inject(FilterService);
  bookService = inject(BookService);
  dbService = inject(DatabaseService);
  checkboxesValues: boolean[] = [];
  allCheckboxValue = true;

  ngOnInit() {
    this.getLibraryFilters();
  }

  initFiltersSelection() {
    this.filterService.libraryFiltersSelected = [
      ...this.filterService.libraryFilters,
    ];
  }

  setCheckboxes(value: boolean) {
    this.checkboxesValues = [];
    this.filterService.libraryFilters.forEach((filter) =>
      this.checkboxesValues.push(value)
    );
  }

  getLibraryFilters(): Unsubscribe {
    return onValue(this.dbService.query('libraries'), (libraries) => {
      this.filterService.libraryFilters = [...libraries.val()];
      this.initFiltersSelection();
      this.setCheckboxes(true);
    });
  }

  setAllCheckboxValue() {
    if (
      isEqual(
        sortBy(this.filterService.libraryFiltersSelected, 'id'),
        sortBy(this.filterService.libraryFilters, 'id')
      )
    ) {
      this.allCheckboxValue = true;
    } else {
      this.allCheckboxValue = false;
    }
  }

  onFiltering(event: boolean, filter: Library, filterIndex: number) {
    if (event) {
      this.filterService.libraryFiltersSelected.push(filter);
    } else {
      const indexOfRemovedFilter =
        this.filterService.libraryFiltersSelected.indexOf(filter);
      this.filterService.libraryFiltersSelected.splice(indexOfRemovedFilter, 1);
    }
    this.checkboxesValues[filterIndex] = event;
    this.setAllCheckboxValue();
  }

  resetSelected() {
    this.filterService.libraryFiltersSelected = [];
    this.filterService.libraryFilters.forEach((filter) =>
      this.filterService.libraryFiltersSelected.push(filter)
    );
    this.setCheckboxes(true);
  }

  selectAll(selected: boolean) {
    if (selected) {
      this.resetSelected();
    } else {
      this.filterService.libraryFiltersSelected = [];
      this.setCheckboxes(false);
    }
    this.setAllCheckboxValue();
  }
}
