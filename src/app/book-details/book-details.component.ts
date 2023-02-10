import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/shared/book.service';
import {
  BookAttrs,
  Department,
  EDepartment,
  IdCard,
  Library,
} from '../shared/book.interface';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {
  activatedRoute = inject(ActivatedRoute);

  idCards = this.bookService.idCards;
  libraries = this.bookService.libraries;
  library!: Library;
  idCard: IdCard | undefined;
  book: BookAttrs | undefined;

  constructor(
    private bookService: BookService,
    protected dbService: DatabaseService
  ) {}

  @Input() department: Department = EDepartment.onloan;

  displayBook() {
    // BOOK
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    const bookIndex = this.bookService.books.findIndex((book) => {
      return book.id == bookId;
    });

    this.book = this.bookService.getBook(bookIndex);

    // LIBRARY
    const libraryIndex: number = this.bookService.libraries.findIndex(
      (library) => library.id === this.book?.libraryId
    );

    this.library = this.libraries[libraryIndex];

    // IDCARDS
    const cardIndex: number = this.bookService.idCards.findIndex(
      (card) => card.id === this.book?.cardId
    );

    this.idCard = this.idCards[cardIndex];

    // DEPARTMENT
    // this.department = this.activatedRoute.data['value']['department'];
    this.activatedRoute.data.subscribe((deparment) => {
      console.log('deparment', deparment.department);

      this.department = deparment.deparment;
    });
    // console.log(
    //   'kuciukuciu',
    //   this.activatedRoute.data.subscribe(
    //     (deparment) => (this.department = deparment.value)
    //   )
    // );
  }

  ngOnInit(): void {
    this.displayBook();

    this.activatedRoute.params.subscribe(() => {
      this.displayBook();
    });
    // console.log(this.activatedRoute);
  }
}
