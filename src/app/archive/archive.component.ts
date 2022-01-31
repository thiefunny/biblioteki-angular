import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

    books = this.database.books;
    constructor(private bookService: BookService, private database: DatabaseService) {}

  ngOnInit(): void {
  }

}
