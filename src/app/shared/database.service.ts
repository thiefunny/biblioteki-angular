import { Book, IDCard, libraryAddress } from './book.interface';

export class DatabaseService {
  librarySelected = 0;
  cardSelected = '';

  private IDs: number[] = [1, 2, 3, 4];

  private libraries: libraryAddress[] = [
    { libNumber: 9, address: 'dziewiec' },
    { libNumber: 32, address: 'trzydiescidwa' },
    { libNumber: 16, address: 'szesnascie' },
    { libNumber: 14, address: 'czternascie' },
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
      returned: false,
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
