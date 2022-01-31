import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-deadlines',
  templateUrl: './deadlines.component.html',
  styleUrls: ['./deadlines.component.scss']
})
export class DeadlinesComponent implements OnInit {

    books = this.database.books;
    constructor(private bookService: BookService, private database: DatabaseService) {}

  ngOnInit(): void {
  }

}
