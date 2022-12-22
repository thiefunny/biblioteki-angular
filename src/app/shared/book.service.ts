import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from './book.interface';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: Book[] = [];
  savedbook = false;

  constructor(
    private database: DatabaseService,
    private httpClient: HttpClient
  ) {}

  getBooks(fromDepartment?: string): Observable<Book[]> {
    return this.httpClient.get<Book[]>(
      `${environment.apiUrl}${fromDepartment}`
    );
  }

  getBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${environment.apiUrl}/books/${id}`);
  }

  // private getLibraryAddress(libraryNumber: number) {
  //   return this.database.getLibraries.filter(
  //     (library) => library.code === Number(libraryNumber)
  //   )[0].address;
  // }

  // private getCardNumber(holder: string) {
  //   return this.database.getIDcards.filter(
  //     (card) => card.holder === holder
  //   )[0].cardNumber;
  // }

  onLibrarySelected(event: any) {
    return (this.database.librarySelected = Number(event.target.value));
  }

  onCardSelected(event: any) {
    return (this.database.cardSelected = event.target.value);
  }

  saveBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(
      `${environment.apiUrl}/books/${book.id}`,
      book
    );
  }

  saveConfirmation() {
    this.savedbook = true;
    setTimeout(() => {
      this.savedbook = false;
    }, 1000);
    // dlaczego getter savedbook w form.component bierze ten setTimeout()
  }

  addBook(book: any) {
    this.httpClient.post<Book>(`${environment.apiUrl}/books`, book).subscribe({
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
