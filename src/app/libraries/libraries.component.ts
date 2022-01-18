import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.component.html',
  styleUrls: ['./libraries.component.scss'],
})
export class LibrariesComponent implements OnInit {
  books = this.bookService.books;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {}
}
