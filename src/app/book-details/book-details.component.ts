import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/shared/book.service';
import { BookAttrs, IdCard, Library } from '../shared/book.interface';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  dbService = inject(DatabaseService);
  subscriptions = new Subscription();

  books = this.bookService.books;
  idCards = this.bookService.idCards;
  libraries = this.bookService.libraries;
  library: Library = this.libraries[0];
  idCard: IdCard = this.idCards[0];
  book: BookAttrs = this.books[0];
  bookId = this.activatedRoute.snapshot.params['bookId'];
  _route = this.router.url;

  constructor(private bookService: BookService) {}

  initBooks() {

    this.bookId = this.activatedRoute.snapshot.params['bookId'];

    // console.log('this.router.url', this.router.url, this.bookId);
    // console.log(
    //   this.bookService.books.findIndex((book) => {
    //     console.log(book.id, this.bookId);

    //     book.id === this.bookId;
    //   })
    // );

    this.bookService.getBook(
      this.bookService.books.findIndex((book) => {
        console.log('miki', book.id, this.bookId);

        book.id === this.bookId;
      })
      );
      // console.log(this.bookService.getBook(this.bookId));

    // // get library of the book
    // // this.dbService.getLibraries()

    // const libraryIndex = this.libraries.indexOf(
    //   this.libraries.find((library) => library.code === this.book.libraryId) ||
    //     this.bookService.libraries[0]
    // );

    // this.library = this.libraries[libraryIndex];

    // // get idCard of the book
    // this.bookService.getIdCards().subscribe((idCards) => {
    //   this.idCards = idCards;

    //   const cardIndex = this.idCards.indexOf(
    //     this.idCards.find((card) => card.code === this.book.cardId) ||
    //       this.bookService.idCards[0]
    //   );

    //   this.idCard = idCards[cardIndex];
    // });
  }

  ngOnInit(): void {
    this.initBooks();

    this.activatedRoute.params.subscribe(() => {
      this.initBooks();
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
