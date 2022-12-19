import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book, Library } from './shared/book.interface';
import { BookService } from './shared/book.service';
import { DatabaseService } from './shared/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatabaseService],
})
export class AppComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    // let _books: Book[] = [];
    // this.httpClient.get<Book[]>(`${environment.apiUrl}/books`).subscribe({
    //   next: (books) => {
    //     _books = books;
    //     _books.forEach((book) => {
    //       // const oldID = book.id;
    //       console.log('before', book);

    //       book.id = _books.indexOf(book);
    //       // console.log(book.id);
    //       // console.log('middle', book);

    //       this.httpClient
    //         .put<Book>(`${environment.apiUrl}/books/${book.id}`, book)
    //         .subscribe({
    //           next: (book) => console.log('after', book),
    //         });
    //     });

    //     // console.log('wciągnięte', _books);
    //   },
    // });

    // this.httpClient.put<Book>(`${environment.apiUrl}/books/${id}`)
  }
}
