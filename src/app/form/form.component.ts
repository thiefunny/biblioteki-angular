import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {
  BookAttrs,
  EDepartment,
  IdCard,
  Library,
} from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';
import { Book } from '../shared/book.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  now = new Date();
  book: BookAttrs | undefined;
  libraries: Library[] | undefined;
  idCards: IdCard[] | undefined;

  constructor(
    private bookService: BookService,
    private database: DatabaseService
  ) {}

  // get returnDate(): Date | undefined {
  //   if (this.dateOfLoan) {
  //     return new Date(Date.now() + 31 * 24 * 3600 * 1000);
  //   }
  //   return undefined;
  // },

  bookForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    libraryId: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),

    dateOfLoan: new FormControl(new Date(), { nonNullable: true }),

    cardId: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),

    penalty: new FormControl(0, { nonNullable: true }),
    returned: new FormControl(false, { nonNullable: true }),
    returnDate: new FormControl(new Date(), { nonNullable: true }),
  });

  onSubmit() {
    const newBook = this.bookForm.getRawValue();
    this.bookService.saveBook(newBook, EDepartment.onloan).subscribe({
      next: () => {
        console.log('saved');
      },
    });
  }

  librarySelected = this.database.librarySelected;
  cardSelected = this.database.cardSelected;

  getLibraries(): Subscription {
    return this.bookService
      .getLibraries()
      .subscribe((libraries) => (this.libraries = libraries));
  }

  getIdCards(): Subscription {
    return this.bookService.getIdCards().subscribe((idCards) => {
      this.idCards = idCards;
      // console.log(this.idCards);
    });
  }

  get savedbook() {
    return this.bookService.savedbook;
  }

  // onLibrarySelected(event: any) {
  //   this.bookService.onLibrarySelected(event);
  //   this.librarySelected = this.database.librarySelected;
  // }

  // onCardSelected(event: any) {
  //   this.bookService.onCardSelected(event);
  //   this.cardSelected = this.database.cardSelected;
  //   // console.log(this.cardSelected);
  // }

  ngOnInit(): void {
    this.getLibraries();
    this.getIdCards();
    // const bookID = this.route.params['bookId'];
    // console.log(bookID);
  }
}
