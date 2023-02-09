import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormValidator {
  static noLibraryCode(codes: number[]): ValidatorFn {
    return (formControl: AbstractControl): ValidationErrors | null => {
      return codes.includes(formControl.value) ? null : { nonZero: true };
    };
  }
}





// constructor(private dbService: DatabaseService) {}

  // noLibraryCode(): AsyncValidatorFn {
  //   return (formControl: AbstractControl): Promise<ValidationErrors | null> => {
  //     const codes: number[] = [];
  //     onValue(
  //       this.dbService.query('libraries'),
  //       (libraries: DataSnapshot) => {
  //         if (libraries) {
  //           forEach(libraries.val(), (library) => codes.push(library.code));
  //         }
  //       },
  //       { onlyOnce: true }
  //     );
  //     return codes.includes(formControl.value) ? null : { noLibraryCode: true };
  //   };
  // }

  // static checkthisout() {
  //   return this.noLibraryCode();
  // }
