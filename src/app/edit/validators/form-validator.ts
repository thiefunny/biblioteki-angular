import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DataSnapshot, get, getDatabase, onValue, ref } from 'firebase/database';
import { forEach } from 'lodash';

export class FormValidator {

// tutaj nie mogłem wstrzyknąć serwisu, żeby uniknąć factory function z argumentem ale od razu skorzystać z bookService.libraryCodes

  static noLibraryCode(codes: number[]): ValidatorFn {
    return (formControl: AbstractControl): ValidationErrors | null => {
      // console.log(codes.includes(formControl.value));
      // console.log(codes);
      return codes.includes(formControl.value) ? null : { noLibraryCode: true };
    };
  }

  static noCardId(formControl: AbstractControl): ValidationErrors | null {
    // console.log(formControl.value);

    return formControl.value === 0 ? { noCardId: true } : null;
  }

  static tooLargePenalty(formControl: AbstractControl): ValidationErrors | null {
    return formControl.value > 100 ? { tooLargePenalty: true } : null;
  }

}

// constructor(private dbService: DatabaseService) {}
// database = getDatabase()

//   noLibraryCode(): AsyncValidatorFn {
//     return (formControl: AbstractControl): Promise<ValidationErrors | null> => {
//       const codes: number[] = [];
//       get(
//         ref(this.database, 'libraries'),
//         (libraries: DataSnapshot) => {
//           if (libraries) {
//             forEach(libraries.val(), (library) => codes.push(library.code));
//           }
//         },
//         { onlyOnce: true }
//       );
//       // return codes.includes(formControl.value) ? null : { noLibraryCode: true };
//     };
//   }

//   static checkthisout() {
//     return this.noLibraryCode();
//   }
// }
