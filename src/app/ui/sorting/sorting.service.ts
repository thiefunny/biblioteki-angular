import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  sortingOptions = [
    { id: 'returnDate', name: 'Najszybciej do zwrotu' },
    { id: 'dateOfLoan', name: 'Najdawniej wypożyczone' },
    { id: 'title', name: 'Alfabetycznie tytułami' },
    { id: 'cardId', name: 'ID karty' },
  ];

  sortingOption = this.sortingOptions[0].id;

  onSorting(event: string) {
    this.sortingOption = event;
  }
}
