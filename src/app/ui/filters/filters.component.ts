import { Component, inject } from '@angular/core';
import { FilterService } from './filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  filterService = inject(FilterService);
}
