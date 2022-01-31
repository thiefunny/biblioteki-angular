import { EventEmitter, Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable()
export class BookService {
  //   bookAddedEvent = new EventEmitter<Book>();

  constructor(private database: DatabaseService) {}

  pageSelected = new EventEmitter<string>();

  getLibraryAddress(libraryNumber: number) {
    return this.database.getLibraries.filter(
      (library) => library.libNumber === Number(libraryNumber)
    )[0].address;
  }

  onLibrarySelected(event: any) {
    return (this.database.librarySelected = Number(event.target.value));
  }

  addBook(
    title: string,
    libraryAddressNumber: number,
    dateOfLoan: Date | null,
    IDCard: number
  ) {
    const ID = this.database.books.length + 1;
    const returnDate = new Date(dateOfLoan!.getTime());
    returnDate.setMonth(returnDate.getMonth() + 1);
    const newBook = {
      ID,
      title,
      returned: false,
      libraryAddress: {
        libNumber: libraryAddressNumber,
        address: this.getLibraryAddress(libraryAddressNumber),
      },
      dateOfLoan,
      returnDate,
      penalty: 2,
      IDcard: { cardNumber: IDCard, cardHolder: 'ktos trzeci' },
    };
    this.database.books.push(newBook);
  }

  get getLibraries() {
    return this.database.getLibraries;
  }
}
