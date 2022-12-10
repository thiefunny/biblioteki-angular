import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book, IDCard, LibraryAddress } from './book.interface';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {

  httpClient = inject(HttpClient);

  getBooks = this.httpClient.get<Book[]>(`${environment.apiUrl}/books`);

  librarySelected = 0;
  cardSelected = '';

  private IDs: number[] = [1, 2, 3, 4];

  private libraries: LibraryAddress[] = [
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

  books: Book[] = [
    {
      ID: this.IDs[0],
      title: 'kniga1',
      returned: false,
      LibraryAddress: this.libraries[1],
      dateOfLoan: new Date(),
      returnDate: new Date(),
      penalty: 2,
      IDcard: this.IDcards[0],
    },
    {
      ID: this.IDs[1],
      title: 'kniga2',
      returned: false,
      LibraryAddress: this.libraries[0],
      dateOfLoan: new Date(),
      returnDate: new Date(),
      penalty: 2,
      IDcard: this.IDcards[1],
    },
    {
      ID: this.IDs[2],
      title: 'kniga3',
      returned: false,
      LibraryAddress: this.libraries[2],
      dateOfLoan: new Date(),
      returnDate: new Date(),
      penalty: 0,
      IDcard: this.IDcards[2],
    },
    {
      ID: this.IDs[3],
      title: 'kniga4',
      returned: false,
      LibraryAddress: this.libraries[3],
      dateOfLoan: new Date(),
      returnDate: new Date(),
      penalty: 3,
      IDcard: this.IDcards[3],
    },
  ];
}
