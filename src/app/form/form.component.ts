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
  librarySelectedIndex: number = 0;
  libraries = this.bookService.getLibraries;

  constructor(private bookService: BookService, private database: DatabaseService) {}

  addBook(title: string, dateOfLoan: Date | null, IDCard: number) {
    const libraryAddressNumber = this.librarySelected;
    this.bookService.addBook(title, libraryAddressNumber, dateOfLoan, IDCard);
  }

  onLibrarySelected(event: any) {
    this.bookService.onLibrarySelected(event);
    this.librarySelected = this.database.librarySelected;
  }

  ngOnInit(): void {}
}
