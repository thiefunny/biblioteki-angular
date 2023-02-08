import { inject } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { BookService } from 'src/app/shared/book.service';

export class FormValidator {
  static bookService: BookService;
  // constructor(private bookService: BookService) {}

  static nonZero(
    formControl: AbstractControl,
    codes: number[]
  ): ValidationErrors | null {
    // console.log(formControl.value);
    // console.log(this.bookService);

    return codes.includes(formControl.value) ? { nonZero: true } : null;
    // formControl.value === 0 ? { nonZero: true } : null;
  }
}
