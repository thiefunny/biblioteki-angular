import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Book } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  now = new Date();
  get savedbook() {
    return this.bookService.savedbook;
  }

  bookForm = new FormGroup({
    title: new FormControl('blabla', {
      nonNullable: true,
      validators: Validators.required,
    }),
    library: new FormControl('32'),
    dateOfLoan: new FormControl(new Date()),
    idCard: new FormControl('Kinia'),
  });

  onSubmit() {
    const book = {
      ...this.bookForm.value,
      penalty: 0,
      returned: false,
      get returnDate(): Date | undefined {
        if (this.dateOfLoan) {
          return new Date(Date.now() + 31 * 24 * 3600 * 1000);
        }
        return undefined;
      },
    };

    this.bookService.addBook(book);

    this.httpClient
      .get<Book[]>(`${environment.apiUrl}/books`)
      .subscribe((books) => {
        this.bookService.books = books;
      });
  }

  librarySelected = this.database.librarySelected;
  cardSelected = this.database.cardSelected;
  libraries = this.database.getLibraries;
  idCards = this.database.getIDcards;

  constructor(
    private bookService: BookService,
    private database: DatabaseService,
    private httpClient: HttpClient
  ) {}

  onLibrarySelected(event: any) {
    this.bookService.onLibrarySelected(event);
    this.librarySelected = this.database.librarySelected;
  }

  onCardSelected(event: any) {
    this.bookService.onCardSelected(event);
    this.cardSelected = this.database.cardSelected;
    // console.log(this.cardSelected);
  }

  ngOnInit(): void {}
}
