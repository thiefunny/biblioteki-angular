import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EDepartment } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidator } from './validators/form-validator';

@Component({
  selector: 'app-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  dbService = inject(DatabaseService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  now = new Date();
  // libraries = this.bookService.libraries;
  // idCards = this.bookService.idCards;
  month = 31 * 24 * 3600 * 1000;

  constructor(protected bookService: BookService) {}

  get libraryCodes() {
    console.log('valid', this.bookService.libraryCodes);
    return this.bookService.libraryCodes;
  }

  // FORM BUILD

  bookForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    libraryId: new FormControl(0, {
      nonNullable: true,
      validators: [FormValidator.noLibraryCode(this.libraryCodes)],
      //dlaczego getter nie bierze zaktualizowanego this.bookservice.libraryccodes sciagnietego juz z bazy, w ngOnInit go sciagalem?
    }),

    dateOfLoan: new FormControl(this.now, { nonNullable: true }),

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

  ngOnInit(): void {
    // this.dbService.getLibraries(); // -> gdybym tutaj chciał wczytywać libraryCodes to muszę mieć asyncrhoniczny validator?
    // this.dbService.getIdCards();
    if (this.router.url !== '/edit/:bookId') {
      const bookId = this.route.snapshot.params['bookId'];
      const bookIndex = this.bookService.books.findIndex((book) => {
        return book.id == bookId;
        // ładować książkę z bazy, a nie stąd??
      });
      const thisbook = this.bookService.getBook(bookIndex);
      thisbook.dateOfLoan = new Date(thisbook.dateOfLoan);
      thisbook.returnDate = new Date(thisbook.returnDate);

      // może jednak tworzyć obiekt książki a nie tylko dopasowywać właściwości? byłoby czytelniej?
      this.bookForm.setValue(thisbook);
      // ?? jak zrobić update daty w HTML date pickerze reactive form?
    }

    // ?? forma nie miała sprawdzanych validatorów dopóki nie pojawiło się coś w ngOnInit
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
      // jak zmienić ten bezsens?
      rawBook.id = undefined;
    } else {
      rawBook.id = Number(this.route.snapshot.params['bookId']);
    }

    // console.log(rawBook);

    length = 0;
    // console.log(this.bookService.libraryCodes);

    if (!rawBook.id) {
      rawBook.id = Math.round(Math.random() * 10000);
      this.dbService.saveBook(rawBook, department);
      // onValue(
      //   this.dbService.query('onloan'),
      //   (books) => {
      //     length = length + Object.keys(books.val()).length;
      //     onValue(
      //       this.dbService.query('archive'),
      //       (books) => {
      //         length = length + Object.keys(books.val()).length;
      //         rawBook.id = length;
      //         console.log(rawBook);
      //         if (rawBook.id) {
      //           this.dbService.saveBook(rawBook, department);
      //         } else {
      //           alert('brak ID');
      //         }
      //       },
      //       { onlyOnce: true }
      //     );
      //   },
      //   { onlyOnce: true }
      // );
    } else {
      this.dbService.saveBook(rawBook, department);
    }
  }

  get savedbook() {
    return this.bookService.savedbook;
  }
}
