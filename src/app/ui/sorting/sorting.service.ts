import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  sortingOptions = [
    { id: 'returnDate', name: 'Najszybciej do zwrotu' },
    { id: 'dateOfLoan', name: 'Najwcześniej wypożyczone' },
    { id: 'title', name: 'Tytuł' },
    { id: 'cardId', name: 'ID karty' },
  ];

  sortingOption = this.sortingOptions[0].id;

  onSorting(event: string) {
    // console.log(event);

    this.sortingOption = event;
  }
}
