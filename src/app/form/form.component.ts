import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  bookForm = new FormGroup({
    title: new FormControl('blabla'),
    library: new FormControl('32'),
    dateOfLoan: new FormControl(new Date),
    idCard: new FormControl('Kinia'),
  });

  onSubmit() {
    const data = {
      ...this.bookForm.value,
      penalty: 0,
      returned: false,
      get returnDate(): Date | undefined {
        if (this.dateOfLoan) {
          return this.dateOfLoan;
        }
        return undefined;
      },
    };

    this.httpClient.post<Book>(`${environment.apiUrl}/books`, data).subscribe();

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
    console.log(this.cardSelected);
  }

  ngOnInit(): void {}
}
