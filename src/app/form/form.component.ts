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

  constructor(private bookService: BookService) {}

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
    console.log(newBook);

    this.bookService.addBook(newBook, EDepartment.onloan);
  }

  getLibraries(): Subscription {
    return this.bookService
      .getLibraries()
      .subscribe((libraries) => (this.libraries = libraries));
  }

  getIdCards(): Subscription {
    return this.bookService.getIdCards().subscribe((idCards) => {
      this.idCards = idCards;
    });
  }

  get savedbook() {
    return this.bookService.savedbook;
  }

  ngOnInit(): void {
    this.getLibraries();
    this.getIdCards();
  }
}
