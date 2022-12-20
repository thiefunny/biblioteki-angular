import { Component, Input, inject } from '@angular/core';
import { Book } from 'src/app/shared/book.interface';
import { BookService } from 'src/app/shared/book.service';

@Component({
  selector: 'app-on-loan',
  templateUrl: './on-loan.component.html',
  styleUrls: ['./on-loan.component.scss'],
})
export class OnLoanComponent {
  bookService = inject(BookService);

  get books(): Book[] {
    return this.bookService.onLoan;
  }
}
