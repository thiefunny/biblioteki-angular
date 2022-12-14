import { Injectable } from '@angular/core';
import { IDCard, Library } from './book.interface';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  librarySelected = 0;
  cardSelected = '';

  private IDs: number[] = [1, 2, 3, 4];

  private libraries: Library[] = [
    { libNumber: 9, address: 'ul. dziewiec' },
    { libNumber: 32, address: 'ul. trzydiescidwa' },
    { libNumber: 16, address: 'ul. szesnascie' },
    { libNumber: 14, address: 'ul. czternascie' },
  ];

  get getLibraries() {
    return this.libraries;
  }

  private IDcards: IDCard[] = [
    { cardNumber: 33333, cardHolder: 'Witek' },
    { cardNumber: 22, cardHolder: 'Gabi' },
    { cardNumber: 4422, cardHolder: 'Miki' },
    { cardNumber: 13253, cardHolder: 'Kinia' },
  ];

  get getIDcards() {
    return this.IDcards;
  }
}
