import { Book } from './book.interface';

export class BookService {
  books: Book[] = [
    {
      ID: 100,
      title: 'kniga1',
      returned: false,
      libraryAddress: { number: 32, address: 'asd' },
      returnDate: new Date(),
      penalty: 2,
      IDcard: { cardNumber: 22222 },
    },
    {
      ID: 200,
      title: 'kniga2',
      returned: false,
      libraryAddress: { number: 17 },
      returnDate: new Date(),
      penalty: 2,
      IDcard: { cardNumber: 222 },
    },
    {
      ID: 300,
      title: 'kniga3',
      returned: true,
      libraryAddress: { number: 32 },
      returnDate: new Date(),
      penalty: 0,
      IDcard: { cardNumber: 33333 },
    },
    {
      ID: 400,
      title: 'kniga4',
      returned: false,
      libraryAddress: { number: 154, address: 'asdertert, 24, kato' },
      returnDate: new Date(),
      penalty: 3,
      IDcard: { cardNumber: 33333, cardHolder: 'Witek' },
    },
  ];
}
