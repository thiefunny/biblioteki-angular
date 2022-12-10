import { Book, IDCard, LibraryAddress } from './book.interface';

export class BookModel {

  private IDs: number[] = [1, 2, 3, 4];

  private libraries: LibraryAddress[] = [
    { libNumber: 9, address: 'dziewiec' },
    { libNumber: 32, address: 'trzydiescidwa' },
    { libNumber: 16, address: 'szesnascie' },
    { libNumber: 14, address: 'czternascie' },
  ];

  private IDcards: IDCard[] = [
    { cardNumber: 33333, cardHolder: 'Witek' },
    { cardNumber: 22, cardHolder: 'Gabi' },
    { cardNumber: 4422, cardHolder: 'Miki' },
    { cardNumber: 13253, cardHolder: 'Kinia' },
  ];

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
      returned: true,
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
