import { Injectable, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  DataSnapshot,
  get,
  getDatabase,
  onValue,
  ref,
} from 'firebase/database';
import { forEach } from 'lodash';
import { BookService } from 'src/app/shared/book.service';

@Injectable({ providedIn: 'root' })
export class FormValidator {
  // noLibraryCode -> Tutaj nie mogłem wstrzyknąć serwisu, żeby uniknąć factory function z argumentem ale od razu skorzystać z bookService.libraryCodes
  // myślalem, że dam radę tak:
  // bookService = inject(BookService)
  // i potem w metodzie noLibraryCode() zrobić:
  // return (formControl: AbstractControl): ValidationErrors | null => {
  // return this.bookService.libraryCodes.includes(formControl.value) ? null : { noLibraryCode: true };
  // };
  // ale nie działało, nie wiem dlaczego

  bookService = inject(BookService);

  // noLibraryCode: ValidatorFn = (formControl: AbstractControl) => {
  //   // console.log('validator', this.bookService.libraryCodes.length);
  //   return this.bookService.libraryCodes.includes(formControl.value) ? null : { noLibraryCode: true };
  // }

  // static noLibraryCode: ValidatorFn = (formControl: AbstractControl) => {
  //   return this.bookService.libraryCodes.includes(formControl.value)
  //     ? null
  //     : { noLibraryCode: true };
  // };

  static noLibraryCode(codes: number[]): ValidatorFn {
    return (formControl: AbstractControl): ValidationErrors | null => {
      // console.log('bzik');

      return codes.includes(formControl.value) ? null : { noLibraryCode: true };
    };
  }

  // static noLibraryCode(formControl: AbstractControl): ValidationErrors | null {
  //   return this.bookService.libraryCodes.includes(formControl.value)
  //     ? null
  //     : { noLibraryCode: true };
  // }

  static noCardId(formControl: AbstractControl): ValidationErrors | null {
    return formControl.value === 0 ? { noCardId: true } : null;
  }

  static tooLargePenalty(
    formControl: AbstractControl
  ): ValidationErrors | null {
    return formControl.value > 100 ? { tooLargePenalty: true } : null;
  }
}
