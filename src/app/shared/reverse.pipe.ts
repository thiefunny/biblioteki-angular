import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book.interface';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(value: Book[]) {
    return value.slice().reverse();
  }
}
