import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookAttrs, Department, IdCard, Library } from './book.interface';
import {
  DataSnapshot,
  Unsubscribe,
  getDatabase,
  onValue,
  ref,
  set,
  remove,
} from 'firebase/database';
import { DatabaseService, database } from '../shared/database.service';
import { forEach } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: BookAttrs[] = [];
  libraries: Library[] = [];
  idCards: IdCard[] = [];
  savedbook = false;

  constructor(
    private httpClient: HttpClient,
    // private dbService: DatabaseService
  ) {}

  getBook(url: string): Observable<BookAttrs> {
    return this.httpClient.get<BookAttrs>(`${environment.apiUrl}${url}`);
  }



  getLibrary(id: number | undefined): Observable<Library> {
    return this.httpClient.get<Library>(
      `${environment.apiUrl}/libraries/${id}`
    );
  }

  getIdCards(): Observable<IdCard[]> {
    return this.httpClient.get<IdCard[]>(`${environment.apiUrl}/idCards`);
  }

  getIdCard(id: number): Observable<IdCard> {
    return this.httpClient.get<IdCard>(`${environment.apiUrl}/idCards/${id}`);
  }



  saveConfirmation() {
    this.savedbook = true;
    setTimeout(() => {
      this.savedbook = false;
    }, 1000);
    // dlaczego getter savedbook w form.component bierze ten setTimeout()
  }

  addBook(book: BookAttrs, department: Department): Subscription {
    return this.httpClient
      .post<BookAttrs>(`${environment.apiUrl}/${department}`, book)
      .subscribe({
        next: () => {
          // console.log('book.service.ts');
          this.saveConfirmation();
        },
        error: (err) => {
          alert(err);
        },
      });
  }
}
