import { Component, OnInit } from '@angular/core';
import { BookService } from './shared/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './shared/global_styles.scss'],
  providers: [BookService],
})
export class AppComponent implements OnInit {
  constructor(private bookService: BookService) {}

  loadedPage: string = '';

  ngOnInit(): void {
    this.bookService.pageSelected.subscribe((page: string) => {
      this.loadedPage = page;
    });
  }
}
