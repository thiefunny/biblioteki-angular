import { Component, inject } from '@angular/core';
import { FilterService } from './filters.service';
import { Library } from 'src/app/shared/book.interface';
import { isEqual, sortBy } from 'lodash';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  filterService = inject(FilterService);
  cd = inject(ChangeDetectorRef);
  libraryCheckboxStatus = true;
  allCheckboxStatus = true;

  setAllCheckboxStatus() {
    if (
      isEqual(
        sortBy(this.filterService.libraryFiltersSelected, 'id'),
        sortBy(this.filterService.libraryFilters, 'id')
      )
    ) {
      this.allCheckboxStatus = true;
    } else {
      this.allCheckboxStatus = false;
    }
  }

  onFiltering(event: boolean, filter: Library) {
    if (event) {
      this.filterService.libraryFiltersSelected.push(filter);
    } else {
      const indexOfRemovedFilter =
        this.filterService.libraryFiltersSelected.indexOf(filter);
      this.filterService.libraryFiltersSelected.splice(indexOfRemovedFilter, 1);
    }

    this.libraryCheckboxStatus = event;
    this.setAllCheckboxStatus();
  }

  resetSelected() {
    this.filterService.libraryFiltersSelected = [];
    this.filterService.libraryFilters.forEach((filter) =>
      this.filterService.libraryFiltersSelected.push(filter)
    );
    this.libraryCheckboxStatus = true;
  }

  selectAll(selected: boolean) {
    if (selected) {
      this.resetSelected();
    } else {
      this.filterService.libraryFiltersSelected = [];
    }
    this.setAllCheckboxStatus();
  }
}
