import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from './shared/book.service';
import { DatabaseService } from './shared/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatabaseService],
})
export class AppComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
  }
}
