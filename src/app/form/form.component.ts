import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  librarySelected = this.bookService.librarySelected;
  librarySelectedIndex: number = 0;

  libraries = this.bookService.getLibraries;

  constructor(private bookService: BookService) {}

  addBook(
    title: string,
    libraryAddressNumber: number,
    dateOfLoan: Date | null,
    IDCard: number
  ) {
    this.bookService.addBook(title, libraryAddressNumber, dateOfLoan, IDCard);
  }

  onLibrarySelected(event: any) {
    this.bookService.onLibrarySelected(event);
    // this.bookService.getLibraryAddress(event.target.value);
    // console.log(this.bookService.getLibraryAddress(Number(event.target.value)));
  }

  ngOnInit(): void {
    //   console.log(this.libraries)
  }
}
