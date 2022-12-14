import { Component } from '@angular/core';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {

    books = this.bookService.books;
    constructor(private bookService: BookService) {}

}
