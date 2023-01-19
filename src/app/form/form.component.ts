import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  BookAttrs,
  IdCard,
  Library
} from '../shared/book.interface';
import { BookService } from '../shared/book.service';

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

  bookForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
    }),

    libraryId: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),

    dateOfLoan: new FormControl(this.now, { nonNullable: true }),

    cardId: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),

    penalty: new FormControl(0, { nonNullable: true }),
    returned: new FormControl(false, { nonNullable: true }),
    returnDate: new FormControl(this.now, { nonNullable: true }),
  });

  onSubmit() {
    const dateOfLoan = new Date(this.bookForm.controls.dateOfLoan.value);
    const returnDate = new Date(dateOfLoan.getTime() + 31 * 24 * 3600 * 1000);
    const newBook: BookAttrs = this.bookForm.getRawValue();
    newBook.dateOfLoan = dateOfLoan;
    newBook.returnDate = returnDate;
    // this.bookService.addBook(newBook, EDepartment.onloan);
  }

  get savedbook() {
    return this.bookService.savedbook;
  }

  ngOnInit(): void {
    // ?? forma nie miała sprawdzanych validatorów dopóki nie pojawiło się coś w ngOnInit
  }
}
