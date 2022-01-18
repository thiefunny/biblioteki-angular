import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  navigateTo(page: string) {
      this.bookService.pageSelected.emit(page);
  }

}
