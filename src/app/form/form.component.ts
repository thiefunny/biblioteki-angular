import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  librarySelected = this.database.librarySelected;
  cardSelected = this.database.cardSelected;
  libraries = this.database.getLibraries;
  idCards = this.database.getIDcards;

  constructor(
    private bookService: BookService,
    private database: DatabaseService
  ) {}

  // addBook(title: string, dateOfLoan: Date | null) {
  //   const LibraryAddressNumber = this.librarySelected;
  //   const cardHolder = this.cardSelected;
  //   this.bookService.addBook(
  //     title,
  //     LibraryAddressNumber,
  //     dateOfLoan,
  //     cardHolder
  //   );
  // }

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
