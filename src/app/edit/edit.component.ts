import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EDepartment } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidator } from './validators/form-validator';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  dbService = inject(DatabaseService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  formValidator = inject(FormValidator);
  now = new Date();
  month = 31 * 24 * 3600 * 1000;

  constructor(protected bookService: BookService) {}

  // FORM BUILD

  bookForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    libraryId: new FormControl(0, {
      nonNullable: true,
    }),
    dateOfLoan: new FormControl(this.now.toString(), { nonNullable: true }),
    cardId: new FormControl(0, {
      nonNullable: true,
      validators: [FormValidator.noCardId],
    }),
    penalty: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, FormValidator.tooLargePenalty],
    }),
    returned: new FormControl(false, { nonNullable: true }),
    returnDate: new FormControl(this.now, { nonNullable: true }),
    id: new FormControl(this.route.snapshot.params['bookId'], {
      nonNullable: true,
    }),
  });

  get savedBook() {
    return this.bookService.savedBook;
  }

  get booksTotalCount(): number {
    return (
      this.bookService.booksCount.onloan + this.bookService.booksCount.archive
    );
  }

  ngOnInit(): void {
    this.dbService.getLibraries();
    this.subscriptions.add(
      this.bookService.libraryCodes.subscribe((codes) => {
        this.bookForm.controls.libraryId.setValidators(
          FormValidator.noLibraryCode(codes)
        );
      })
    );

    if (this.router.url !== '/edit/:bookId') {
      const bookId = this.route.snapshot.params['bookId'];
      const bookIndex = this.bookService.books.findIndex((book) => {
        return book.id == bookId;
      });
      const thisbook = this.bookService.getBook(bookIndex);
      if (thisbook) {
        thisbook.dateOfLoan = new Date(thisbook.dateOfLoan);
        thisbook.returnDate = new Date(thisbook.returnDate);
        this.bookForm.setValue(thisbook);
        this.bookForm.controls.dateOfLoan.setValue(
          formatDate(thisbook.dateOfLoan, 'yyyy-MM-dd', 'en')
        );
      }
    }
  }

  onSubmit() {
    const dateOfLoan = new Date(this.bookForm.controls.dateOfLoan.value);
    const returnDate = new Date(dateOfLoan.getTime() + this.month);
    const rawBook: any = this.bookForm.getRawValue();
    const department = rawBook.returned
      ? EDepartment.archive
      : EDepartment.onloan;
    rawBook.dateOfLoan = dateOfLoan.toJSON();
    rawBook.returnDate = returnDate.toJSON();

    if (this.router.url === '/edit/:bookId') {
      rawBook.id = undefined;
    } else {
      rawBook.id = Number(this.route.snapshot.params['bookId']);
    }

    if (!rawBook.id) {
      rawBook.id = this.booksTotalCount + 1;
      this.dbService.saveBook(rawBook, department);
    } else {
      this.dbService.saveBook(rawBook, department);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

