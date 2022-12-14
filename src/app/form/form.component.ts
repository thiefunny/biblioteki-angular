import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from '../shared/book.interface';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})

export class FormComponent implements OnInit {

bookForm = new FormGroup({
    'title': new FormControl('tytułek'),
    'library': new FormControl('32'),
    'dateOfLoan': new FormControl(null),
    'idCard': new FormControl(null)
});




  librarySelected = this.database.librarySelected;
  cardSelected = this.database.cardSelected;
  libraries = this.database.getLibraries;
  idCards = this.database.getIDcards;

  constructor(
    private bookService: BookService,
    private database: DatabaseService,
    private httpClient: HttpClient
  ) {}

  data = {
    id: '5',
    title: 'kniga4',
    returned: false,
    library: 3,
    dateOfLoan: '2012-04-23T18:25:43.511Z',
    returnDate: '2023-04-23T18:25:43.511Z',
    penalty: '3',
    idCard: 3,
  };

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  addBook() {
    this.httpClient
      .post<Book>(`http://localhost:9020/books/`, this.data, this.httpOptions)
      .subscribe();
    console.log('dodane');
  }

  onLibrarySelected(event: any) {
    this.bookService.onLibrarySelected(event);
    this.librarySelected = this.database.librarySelected;
  }

  onCardSelected(event: any) {
    this.bookService.onCardSelected(event);
    this.cardSelected = this.database.cardSelected;
    console.log(this.cardSelected);
  }

  ngOnInit(): void {
  }
}
