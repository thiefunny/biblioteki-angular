import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  library!: Library;
  idCard: IdCard | undefined;
  book: BookAttrs | undefined;
  bookId: Params | undefined;
  _route = this.router.url;

  constructor(private bookService: BookService) {}

  initBooks() {
    // console.log('this.library', this.library, 'this.libraries', this.libraries);
    this.bookId = this.activatedRoute.snapshot.params['bookId'];

    // console.table(this.bookService.books);

    const bookIndex = this.bookService.books.findIndex((book) => {
      // console.log('book.id', book.id, 'this.bookId[param]', this.bookId);
      // console.log('book.id === this.bookId', book.id == this.bookId);

      return book.id == this.bookId;
    });

    // console.log('bookIndex', bookIndex);

    this.book = this.bookService.getBook(bookIndex);

    const libraryIndex: number = this.bookService.libraries.findIndex(
      (library) => {
        // console.log('console.log(library, book);', library, book);
        // console.log('library.code, book.libraryId', library.id, book.libraryId);
        return library.id === this.book?.libraryId;
      }
    );

    console.log('libraryIndex', libraryIndex);

    this.library = this.libraries[libraryIndex];

    // console.log('this.library', this.library, 'this.libraries', this.libraries);

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
