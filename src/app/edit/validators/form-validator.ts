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

export class FormValidator {
  // noLibraryCode -> Tutaj nie mogłem wstrzyknąć serwisu, żeby uniknąć factory function z argumentem ale od razu skorzystać z bookService.libraryCodes
  // myślalem, że dam radę tak:
  // bookService = inject(BookService)
  // i potem w metodzie noLibraryCode() zrobić:
  // return (formControl: AbstractControl): ValidationErrors | null => {
  // return this.bookService.libraryCodes.includes(formControl.value) ? null : { noLibraryCode: true };
  // };
  // ale nie działało, nie wiem dlaczego

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

// PONIŻEJ PRÓBUJĘ ZROBIĆ ASYNCHRONICZNNY VALIDATOR DO SPRAWDZANIA CZY WYBRANA WARTOŚĆ W KONTROLCE FORMULARZA 'SELECT' [LIBRARY] MA WARTOŚĆ, KTÓRA ISTNIEJE W BAZIE W 'LIBRARIES'
// NATOMIAST AsyncValidatorFn ZWRACA PROMISE ALBO OBSERVABLE, A METODA onValue() ZWRACA 'Unsubscribe', nie wiem jak to ogarnąć. Gdyby się dało to nie muszę mieć argumentu w synchornicznym validatorze, który jest powyżej

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
