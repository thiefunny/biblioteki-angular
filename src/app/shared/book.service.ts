import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from './book.interface';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: Book[] = [];
  savedbook = false;

  get onLoan() {
    return this.books.filter((book) => !book.returned);
  }
  get returned() {
    return this.books.filter((book) => book.returned);
  }

  constructor(
    private database: DatabaseService,
    private httpClient: HttpClient
  ) {}

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${environment.apiUrl}/books`);

    // dlaczego to nie działa poniżej
    // return this.httpClient.get<Book[]>(`${environment.apiUrl}/books`).subscribe((books: Book[]) => {
    //   this.books = books;
    // });
  }

  getBook(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/books/${id}`);
  }

  private getLibraryAddress(libraryNumber: number) {
    return this.database.getLibraries.filter(
      (library) => library.libNumber === Number(libraryNumber)
    )[0].address;
  }

  private getCardNumber(cardHolder: string) {
    return this.database.getIDcards.filter(
      (card) => card.cardHolder === cardHolder
    )[0].cardNumber;
  }

  onLibrarySelected(event: any) {
    return (this.database.librarySelected = Number(event.target.value));
  }

  onCardSelected(event: any) {
    // console.log(event.target.value);
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
