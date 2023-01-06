import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookAttrs, Department, IdCard, Library } from './book.interface';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  books: BookAttrs[] = [];
  savedbook = false;

  constructor(
    private database: DatabaseService,
    private httpClient: HttpClient
  ) {}

  getBooks(fromDepartment?: string): Observable<BookAttrs[]> {
    console.log(`getBooks(${environment.apiUrl}${fromDepartment})`);

    return this.httpClient.get<BookAttrs[]>(
      `${environment.apiUrl}${fromDepartment}`
    );
  }

  getBook(url: string): Observable<BookAttrs> {
    return this.httpClient.get<BookAttrs>(`${environment.apiUrl}${url}`);
  }

  getLibraries(): Observable<Library[]> {
    return this.httpClient.get<Library[]>(`${environment.apiUrl}/libraries`);
  }

  getIdCards(): Observable<IdCard[]> {
    return this.httpClient.get<IdCard[]>(`${environment.apiUrl}/idCards`);
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

  saveBook(book: BookAttrs, department: Department): Observable<BookAttrs> {
    return this.httpClient.post<BookAttrs>(
      `${environment.apiUrl}/${department}`,
      book
    );
  }

  deleteBook(book: BookAttrs, department: Department): Observable<BookAttrs> {
    return this.httpClient.delete<BookAttrs>(
      `${environment.apiUrl}/${department}/${book.id}`
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
    this.httpClient
      .post<BookAttrs>(`${environment.apiUrl}/books`, book)
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
