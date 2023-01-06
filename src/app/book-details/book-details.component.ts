import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Params,
  Router,
  Scroll,
  UrlSegment,
} from '@angular/router';
import { BookService } from 'src/app/shared/book.service';
import { BookAttrs, IdCard, Library } from '../shared/book.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  subscriptions = new Subscription();

  // idCard: IdCard | undefined;
  // libraries: Library[] | undefined;
  // idCards: IdCard[];

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
    this.bookService.getBook(this.router.url).subscribe((book: BookAttrs) => {
      this.book = book;

      // get library of the book
      this.bookService.getLibraries().subscribe((libraries) => {
        this.libraries = libraries;

        const libraryIndex = this.libraries.indexOf(
          this.libraries.find(
            (library) => library.code === this.book.libraryId
          ) || this.bookService.libraries[0]
        );

        this.library = this.libraries[libraryIndex];

        // get idCard of the book
        this.bookService.getIdCards().subscribe((idCards) => {
          this.idCards = idCards;

          const cardIndex = this.idCards.indexOf(
            this.idCards.find((card) => card.code === this.book.cardId) ||
              this.bookService.idCards[0]
          );

          this.idCard = idCards[cardIndex];
        });
      });
    });
  }

  ngOnInit(): void {
    this.initBooks();
    // this.bookService
    //   .getBook(this.router.url)
    //   .subscribe((book) => (this.book = book));

    this.activatedRoute.params.subscribe(() => {
      this.initBooks();
      // this.bookService.getBook(this.router.url).subscribe((book: BookAttrs) => {
      //   this.book = book;

      //   // get library of the book
      //   this.bookService.getLibraries().subscribe((libraries) => {
      //     this.libraries = libraries;

      //     const libraryIndex = this.libraries.indexOf(
      //       this.libraries.find(
      //         (library) => library.code === this.book.libraryId
      //       ) || this.bookService.libraries[0]
      //     );

      //     this.library = this.libraries[libraryIndex];

      //     // console.log(this.libraries.indexOf(libraryIndex || this.bookService.libraries[0]));

      //     // this.bookService
      //     //   .getLibrary(libraryId)
      //     //   .subscribe((library) => (this.library = library));
      //   });

      //   // get idCard of the book
      //   // this.bookService.getIdCards().subscribe((idCards) => {
      //   //   this.idCards = idCards;

      //   //   const cardId = this.idCards.find(
      //   //     (card) => card.code === this.book.cardId
      //   //   ).id;

      //   //   this.bookService
      //   //     .getIdCard(cardId)
      //   //     .subscribe((idCard) => (this.idCard = idCard));
      //   // });
      // });
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
