import { Injectable } from '@angular/core';
import { BookAttrs, IdCard, Library } from './book.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: BookAttrs[] = [];
  libraries: Library[] = [];
  libraryCodes = new BehaviorSubject<number[]>([]);
  idCards: IdCard[] = [];
  idCardsCodes: number[] = [];
  savedbook = false;

  getBook(id: number): BookAttrs | undefined {
    return this.books[`${id}`];
  }

  saveConfirmation() {
    // dlaczego getter savedbook w form.component bierze ten setTimeout(), czy to detekcja zmian Angulara ogarnia? Chodzi o to, że po 3 sekundach zmienna savedbook wraca do stanu false, a wtedy w form.component kończy się wyświetlać alert o zapisaniu książki [tak powinno być, ale nie wiem, czemu to działa xD
    this.savedbook = true;
    setTimeout(() => {
      this.savedbook = false;
    }, 3000);
  }
}
