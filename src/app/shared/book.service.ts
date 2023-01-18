import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookAttrs, Department, IdCard, Library } from './book.interface';

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
  ) {}

  getBook(id: number): BookAttrs {
    return this.books[`${id}`]
  }

  getLibrary(id: number | undefined): Observable<Library> {
    return this.httpClient.get<Library>(
      `${environment.apiUrl}/libraries/${id}`
    );
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
          this.saveConfirmation();
        },
        error: (err) => {
          alert(err);
        },
      });
  }
}
