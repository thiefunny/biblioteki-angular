import { Component } from '@angular/core';
import { SortingService } from './sorting.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
})
export class SortingComponent {
  constructor(protected sortingService: SortingService) {}
}
