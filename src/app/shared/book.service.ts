import { EventEmitter } from '@angular/core';
import { Book, IDCard, libraryAddress } from './book.interface';

export class BookService {
  bookAddedEvent = new EventEmitter<Book>();

  pageSelected = new EventEmitter<string>();

//   getLibraryAddress(libraryNumber) {

//   }

  addBook(
    title: string,
    libraryAddressNumber: number,
    dateOfLoan: Date | null,
    IDCard: number,
    index: number
  ) {
    const ID = this.books.length + 1;
    const returnDate = new Date(dateOfLoan!.getTime());
    returnDate.setMonth(returnDate.getMonth() + 1);
    const newBook = {
      ID,
      title,
      returned: false,
      libraryAddress: {
        number: libraryAddressNumber,
        address: 'asd',
      },
      dateOfLoan,
      returnDate,
      penalty: 2,
      IDcard: { cardNumber: IDCard, cardHolder: 'ktos trzeci' },
    };
    this.books.push(newBook);
    // console.log(dateOfLoan);
    // console.log(returnDate);
  }

  private IDs: number[] = [1, 2, 3, 4];

  private libraries: libraryAddress[] = [
    { number: 9, address: 'dziewiec' },
    { number: 32, address: 'trzydiescidwa' },
    { number: 16, address: 'szesnascie' },
    { number: 14, address: 'czternascie' },
  ];

  private IDcards: IDCard[] = [
    { cardNumber: 33333, cardHolder: 'Witek' },
    { cardNumber: 22, cardHolder: 'Gabi' },
    { cardNumber: 4422, cardHolder: 'Miki' },
    { cardNumber: 13253, cardHolder: 'Kinia' },
  ];

  get getLibraries() {
    return this.libraries;
  }

  books: Book[] = [
    {
      ID: this.IDs[0],
      title: 'kniga1',
      returned: false,
      libraryAddress: this.libraries[1],
      dateOfLoan: new Date(),
      returnDate: new Date(),
      penalty: 2,
      IDcard: this.IDcards[0],
    },
    {
      ID: this.IDs[1],
      title: 'kniga2',
      returned: false,
      libraryAddress: this.libraries[0],
      dateOfLoan: new Date(),
      returnDate: new Date(),
      penalty: 2,
      IDcard: this.IDcards[1],
    },
    {
      ID: this.IDs[2],
      title: 'kniga3',
      returned: true,
      libraryAddress: this.libraries[2],
      dateOfLoan: new Date(),
      returnDate: new Date(),
      penalty: 0,
      IDcard: this.IDcards[2],
    },
    {
      ID: this.IDs[3],
      title: 'kniga4',
      returned: false,
      libraryAddress: this.libraries[3],
      dateOfLoan: new Date(),
      returnDate: new Date(),
      penalty: 3,
      IDcard: this.IDcards[3],
    },
  ];
}
