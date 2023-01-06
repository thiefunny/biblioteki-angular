import { Pipe, PipeTransform } from '@angular/core';
import { BookAttrs } from './book.interface';

@Pipe({ name: 'reverse' })
export class ReversePipe implements PipeTransform {
  transform(value: BookAttrs[]) {
    return value.slice().reverse();
  }
}
