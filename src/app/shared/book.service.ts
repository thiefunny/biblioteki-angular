import { EventEmitter, Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Book } from './book.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  getBooks(): void {
    this.httpClient
      .get<Book[]>(`${environment.apiUrl}/books`)
      .subscribe((books: Book[]) => {
        this.books = books;
      });
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

  // addBook(
  //   title: string,
  //   LibraryAddressNumber: number,
  //   dateOfLoan: Date | null,
  //   cardHolder: string
  // ) {
  //   const ID = this.book.books.length + 1;
  //   const returnDate = new Date(dateOfLoan!.getTime());
  //   returnDate.setMonth(returnDate.getMonth() + 1);
  //   const newBook = {
  //     ID,
  //     title,
  //     returned: false,
  //     library: {
  //       libNumber: LibraryAddressNumber,
  //       address: this.getLibraryAddress(LibraryAddressNumber),
  //     },
  //     dateOfLoan,
  //     returnDate,
  //     penalty: 2,
  //     idCard: { cardNumber: this.getCardNumber(cardHolder), cardHolder },
  //   };
  //   this.database.books.push(newBook);
  // }
}
