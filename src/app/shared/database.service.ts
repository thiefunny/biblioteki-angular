import { ChangeDetectorRef, Injectable, inject } from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  DataSnapshot,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
} from 'firebase/database';
import { forEach } from 'lodash';
import { BookAttrs, Department, EDepartment, Library } from './book.interface';
import { BookService } from './book.service';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDlx9ZRdO9AY48vl1-jUnLNzmrk8DieXhw',
  authDomain: 'biblioteki-12cff.firebaseapp.com',
  projectId: 'biblioteki-12cff',
  storageBucket: 'biblioteki-12cff.appspot.com',
  messagingSenderId: '747520075724',
  appId: '1:747520075724:web:57f59b38cd4b3206769f69',
  measurementId: 'G-3Q8HJ640VM',
  databaseURL:
    'https://biblioteki-12cff-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics();
export const database = getDatabase();

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  bookService = inject(BookService);

  //////////// BOOKS

  // ładuję książki z bazy danych
  getBooks(fromDepartment: string): void {
    onValue(this.query(fromDepartment), (books: DataSnapshot) => {
      if (books) {
        this.bookService.books = [];
        forEach(books.val(), (val) =>
          val ? this.bookService.books.push(val) : null
        );
      } else {
        alert('books are empty');
      }
    });
  }

  saveBook(book: BookAttrs, department: Department): void {
    set(this.query(`${department}/${book.id}`), book);
    this.bookService.saveConfirmation();
  }

  update(book: BookAttrs, department: Department): void {
    set(this.query(`${department}/${book.id}`), book);
    this.bookService.saveConfirmation();
  }

  delete(book: BookAttrs, department: Department): void {
    //tutaj to jeszcze nie działa, muszę sprawdzić dlaczego
    console.log('deleting');
    console.log(book, department);
    remove(this.query(`${department}/${book.id}`));
  }

  /////////// LIBRARIES

  getLibraries(): void {
    onValue(
      this.query('libraries'),
      (librariesData: DataSnapshot) => {
        if (librariesData) {
          // czyszczę tablice, żeby nie duplikować danych
          const libraries: Library[] = [];
          const libraryCodes: number[] = [];
          forEach(librariesData.val(), (library) => {
            libraries.push(library);
            libraryCodes.push(library.code);
            // console.log(this.bookService.libraryCodes);
          });
          this.bookService.libraries = libraries;
          this.bookService.libraryCodes.next(libraryCodes);
        } else {
          alert('libraries are empty');
        }
      },
      { onlyOnce: true }
    );
  }

  // IDCARDS

  getIdCards(): void {
    onValue(
      this.query('idCards'),
      (cards) => {
        this.bookService.idCards = [];
        this.bookService.idCardsCodes = [];
        forEach(cards.val(), (card) => {
          if (card) {
            this.bookService.idCards.push(card);
            this.bookService.idCardsCodes.push(card.code);
          } else {
            alert('idCards are empty');
          }
        });
      },
      { onlyOnce: true }
    );
  }

  // TRANSFER ONLOAN <=> ARCHIVE

  _transfer(
    book: BookAttrs,
    toDepartment: Department,
    fromDepartment: Department
  ) {
    this.saveBook(book, toDepartment);
    this.delete(book, fromDepartment);
  }

  transfer(book: BookAttrs, department: Department) {
    switch (department) {
      case EDepartment.onloan:
        this._transfer(book, EDepartment.archive, EDepartment.onloan);
        break;
      case EDepartment.archive:
        this._transfer(book, EDepartment.onloan, EDepartment.archive);
        break;
    }
  }

  // HELPERS

  query(url: string) {
    return ref(database, url);
  }
}
