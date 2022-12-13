import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book, IDCard, Library } from './book.interface';

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

  // books: Book[] = [
  //   {
  //     ID: this.IDs[0],
  //     title: 'kniga1',
  //     returned: false,
  //     library: this.libraries[1],
  //     dateOfLoan: new Date(),
  //     returnDate: new Date(),
  //     penalty: 2,
  //     idCard: this.IDcards[0],
  //   },
  //   {
  //     ID: this.IDs[1],
  //     title: 'kniga2',
  //     returned: false,
  //     library: this.libraries[0],
  //     dateOfLoan: new Date(),
  //     returnDate: new Date(),
  //     penalty: 2,
  //     idCard: this.IDcards[1],
  //   },
  //   {
  //     ID: this.IDs[2],
  //     title: 'kniga3',
  //     returned: false,
  //     library: this.libraries[2],
  //     dateOfLoan: new Date(),
  //     returnDate: new Date(),
  //     penalty: 0,
  //     idCard: this.IDcards[2],
  //   },
  //   {
  //     ID: this.IDs[3],
  //     title: 'kniga4',
  //     returned: false,
  //     library: this.libraries[3],
  //     dateOfLoan: new Date(),
  //     returnDate: new Date(),
  //     penalty: 3,
  //     idCard: this.IDcards[3],
  //   },
  // ];
}
