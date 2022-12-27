import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import { BookService } from 'src/app/shared/book.service';
import { Book } from '../shared/book.interface';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  books = this.bookService.books;
  // location = inject(Location)
  router = inject(Router);
  route = inject(ActivatedRoute);
  bookId = this.route.snapshot.params['bookId'];
  _route = this.router.url;

  constructor(private bookService: BookService) {
    this.book = this.books[0];
    // console.log(this.book);
  }

  ngOnInit(): void {
    this.route.pathFromRoot[1].url.subscribe((val) => console.log(val[0].path));
    // console.log(
    //   this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET]
    //     .segments
    // );
    // console.log(/^\/([^/]+)\//.exec(this.router.url));

    this.route.params.subscribe((params: Params) => {
      const id = params['bookId'];
      // console.log(id);

      this.bookService
        .getBook(this._route.slice(1), id)
        .subscribe((book: Book) => {
          this.book = book;
        });

      // console.log('book-details');
    });
  }
}
