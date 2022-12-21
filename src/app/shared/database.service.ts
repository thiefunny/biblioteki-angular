import { Injectable } from '@angular/core';
import { IdCard, Library } from './book.interface';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  librarySelected = 0;
  cardSelected = '';

  private libraries: Library[] = [
    { code: 9, address: 'ul. dziewiec' },
    { code: 32, address: 'ul. trzydiescidwa' },
    { code: 16, address: 'ul. szesnascie' },
    { code: 14, address: 'ul. czternascie' },
  ];

  get getLibraries() {
    return this.libraries;
  }

  private IDcards: IdCard[] = [
    { code: 33333, holder: 'Witek' },
    { code: 22, holder: 'Gabi' },
    { code: 4422, holder: 'Miki' },
    { code: 13253, holder: 'Kinia' },
  ];

  get getIDcards() {
    return this.IDcards;
  }
}
