import { EventEmitter } from '@angular/core';
import { Book } from './book.interface';

export class BookService {
  bookAddedEvent = new EventEmitter<Book>();

  pageSelected = new EventEmitter<string>();

  addBook(
    title: string,
    libraryAddressNumber: number,
    dateOfLoan: Date | null,
    IDCard: number
  ) {
    const ID = this.books.length + 1;
    const newBook = {
      ID,
      title,
      returned: false,
      libraryAddress: { number: libraryAddressNumber, address: 'asd' },
      dateOfLoan,
      returnDate: dateOfLoan,
      penalty: 2,
      IDcard: { cardNumber: IDCard },
    };
    this.books.push(newBook);
    console.log(this.books);
  }

  private IDs: number[] = [1, 2, 3, 4];

  books: Book[] = [
    {
      ID: this.IDs[0],
      title: 'kniga1',
      returned: false,
      libraryAddress: { number: 32, address: 'asd' },
      dateOfLoan: new Date(),
      returnDate: new Date(),
      penalty: 2,
      IDcard: { cardNumber: 22222 },
    },
    {
      ID: this.IDs[1],
      title: 'kniga2',
      returned: false,
      libraryAddress: { number: 17 },
      dateOfLoan: new Date(),
      returnDate: new Date(),
      penalty: 2,
      IDcard: { cardNumber: 222 },
    },
    {
      ID: this.IDs[2],
      title: 'kniga3',
      returned: true,
      libraryAddress: { number: 32 },
      dateOfLoan: new Date(),
      returnDate: new Date(),
      penalty: 0,
      IDcard: { cardNumber: 33333 },
    },
    {
      ID: this.IDs[3],
      title: 'kniga4',
      returned: false,
      libraryAddress: { number: 154, address: 'asdertert, 24, kato' },
      dateOfLoan: new Date(),
      returnDate: new Date(),
      penalty: 3,
      IDcard: { cardNumber: 33333, cardHolder: 'Witek' },
    },
  ];
}
