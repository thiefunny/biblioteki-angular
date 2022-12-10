import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  books: Book[] = [];

  getBooks = this.httpClient.get<Book[]>(`${environment.apiUrl}/books`).subscribe((books: Book[])=> {
    this.books = books;
    // console.log('this.books', this.books)
  });

  constructor(
    private bookService: BookService,
    private database: DatabaseService,
    private httpClient: HttpClient
  ) {}

  archiveBook(book: Book) {
    book.returned = true;
  }

  ngOnInit(): void {
    // this.books.subscribe((data: Book[]) => {
    //     console.log(data)
    // });
  }
}
