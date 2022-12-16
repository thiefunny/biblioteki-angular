import { EventEmitter, Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Book } from './book.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: Book[] = [];

  constructor(
    private database: DatabaseService,
    private httpClient: HttpClient
  ) {}

  pageSelected = new EventEmitter<string>();

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${environment.apiUrl}/books`);


    // dlaczego to nie działa poniżej
    // return this.httpClient.get<Book[]>(`${environment.apiUrl}/books`).subscribe((books: Book[]) => {
    //   this.books = books;
    // });

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
    console.log(event.target.value);
    return (this.database.cardSelected = event.target.value);
  }

  archiveBook(book: Book) {
    book.returned = true;
  }

  addBook() {
    this.httpClient
      .post<Book>(`${environment.apiUrl}/books`, {
        id: 7,
        title: 'ertertert',
        returned: false,
        library: { libNumber: 123213, address: 'kokokoko' },
        dateOfLoan: '2012-04-23T18:25:43.511Z',
        returnDate: '2012-04-23T18:25:43.511Z',
        penalty: 234,
        idCard: {
          cardNumber: 25123,
          cardHolder: 'mikuś',
        },
      })
      .subscribe({
        next: (book) => console.log(book),
      });
    console.log('dodane');
  }
}
