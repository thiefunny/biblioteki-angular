import { BookAttrs } from './book.interface';

export class Book {
  id?: number;
  title: string;
  libraryId: number;
  dateOfLoan: Date;
  returnDate: Date;
  cardId: number;
  penalty: number;
  returned: boolean;

  constructor(bookAttrs: BookAttrs) {
    this.id = bookAttrs.id;
    this.title = bookAttrs.title;
    this.libraryId = bookAttrs.libraryId;
    this.dateOfLoan = bookAttrs.dateOfLoan;
    this.returnDate = bookAttrs.returnDate;
    this.cardId = bookAttrs.cardId;
    this.penalty = bookAttrs.penalty;
    this.returned = bookAttrs.returned;
  }
}
