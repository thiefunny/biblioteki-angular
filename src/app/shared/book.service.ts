import { Injectable } from '@angular/core';
import { BookAttrs, IdCard, Library } from './book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: BookAttrs[] = [];
  libraries: Library[] = [];
  libraryCodes: number[] = [];
  idCards: IdCard[] = [];
  idCardsCodes: number[] = [];
  savedbook = false;

  getBook(id: number): BookAttrs {
    return this.books[`${id}`];
  }

  saveConfirmation() {
    // dlaczego getter savedbook w form.component bierze ten setTimeout()
    this.savedbook = true;
    setTimeout(() => {
      this.savedbook = false;
    }, 3000);
  }
}
