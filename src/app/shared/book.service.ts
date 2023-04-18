import { Injectable } from '@angular/core';
import { BookAttrs, IdCard, Library } from './book.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: BookAttrs[] = [];
  libraries: Library[] = [];
  libraryCodes: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  idCards: IdCard[] = [];
  idCardsCodes: number[] = [];
  savedBook = false;
  booksCount = { onloan: 0, archive: 0 }

  getBook(id: number): BookAttrs {
    return this.books[`${id}`];
  }

  saveConfirmation() {
    this.savedBook = true;
    setTimeout(() => {
      this.savedBook = false;
    }, 3000);
  }
}
