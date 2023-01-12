import { Injectable } from '@angular/core';
import { IdCard, Library } from '../shared/book.interface';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  libraryFilters: Library[] = [];
  libraryFiltersSelected: number[] = [];
  idCardFilters: IdCard[] = [];
}
