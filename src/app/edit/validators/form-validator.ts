import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { BookService } from 'src/app/shared/book.service';

@Injectable({ providedIn: 'root' })
export class FormValidator {
  bookService = inject(BookService);
  static noLibraryCode(codes: number[]): ValidatorFn {
    return (formControl: AbstractControl): ValidationErrors | null => {
      return codes.includes(formControl.value) ? null : { noLibraryCode: true };
    };
  }

  static noCardId(formControl: AbstractControl): ValidationErrors | null {
    return formControl.value === 0 ? { noCardId: true } : null;
  }

  static tooLargePenalty(
    formControl: AbstractControl
  ): ValidationErrors | null {
    return formControl.value > 100 ? { tooLargePenalty: true } : null;
  }
}
