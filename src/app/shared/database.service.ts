import { Injectable, inject } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  DataSnapshot,
  Unsubscribe,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
} from 'firebase/database';
import { forEach } from 'lodash';
import { BookService } from './book.service';
import { BookAttrs, Department, EDepartment } from './book.interface';

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

  // BOOKS

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
  }

  deleteBook(book: BookAttrs, department: Department): void {
    remove(this.query(`${department}/${book.id}`));
  }

  // LIBRARIES

  getLibraries(): void {
    onValue(this.query('libraries'), (libraries: DataSnapshot) => {
      if (libraries) {
        this.bookService.libraries = [];
        forEach(libraries.val(), (library) =>
          library ? this.bookService.libraries.push(library) : null
        );
        // console.log(this.bookService.libraries);
      } else {
        alert('libraries are empty');
      }
    });
  }

  // IDCARDS

  getIdCards(): void {
    onValue(this.query('idCards'), (cards) => {
      alert('implementation needed');
    });
  }

  // TRANSFER ONLOAN <=> ARCHIVE

  _transfer(
    book: BookAttrs,
    toDepartment: Department,
    fromDepartment: Department
  ) {
    this.saveBook(book, toDepartment);
    this.deleteBook(book, fromDepartment);
  }

  transfer(book: BookAttrs, department: string) {
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
