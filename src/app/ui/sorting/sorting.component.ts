import { Component } from '@angular/core';
import { SortingService } from './sorting.service';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent {
  constructor(protected sortingService: SortingService) {}
}
