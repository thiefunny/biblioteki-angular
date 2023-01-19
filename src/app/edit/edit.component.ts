import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookAttrs, EDepartment } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';
import { DataSnapshot, onValue } from 'firebase/database';
import { forEach } from 'lodash';

@Component({
  selector: 'app-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  dbService = inject(DatabaseService);

  now = new Date();
  libraries = this.bookService.libraries;
  idCards = this.bookService.idCards;
  month = 31 * 24 * 3600 * 1000;

  constructor(protected bookService: BookService) {}

  // FORM BUILD

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

  ngOnInit(): void {
    this.dbService.getLibraries();
    this.dbService.getIdCards();

    // ?? forma nie miała sprawdzanych validatorów dopóki nie pojawiło się coś w ngOnInit
  }

  onSubmit() {
    const dateOfLoan = new Date(this.bookForm.controls.dateOfLoan.value);
    const returnDate = new Date(dateOfLoan.getTime() + this.month);
    const book: BookAttrs = this.bookForm.getRawValue();
    const department = book.returned ? EDepartment.archive : EDepartment.onloan;
    book.dateOfLoan = dateOfLoan;
    book.returnDate = returnDate;
    length = 0;
    if (!book.id) {
      onValue(
        this.dbService.query('onloan'),
        (books) => {
          length = length + Object.keys(books.val()).length;
          onValue(
            this.dbService.query('archive'),
            (books) => {
              length = length + Object.keys(books.val()).length;
              book.id = length;
              console.log(book);
              if (book.id) {
                this.dbService.saveBook(book, department);
              } else {
                alert('brak ID');
              }
            },
            { onlyOnce: true }
          );
        },
        { onlyOnce: true }
      );
    }
  }

  get savedbook() {
    return this.bookService.savedbook;
  }
}
