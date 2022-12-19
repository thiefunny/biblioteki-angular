import { Component } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book.interface';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent {
  get books(): Book[] {
    return this.bookService.books;
  }

  constructor(private bookService: BookService) {}
}
