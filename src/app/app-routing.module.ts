import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksListComponent } from './books/books-list.component';
import { FormComponent } from './form/form.component';
import { LoadedBooksGuard } from './shared/loaded-books.guard';

export const routes: Routes = [
  {
    path: 'onloan',
    title: 'Wypożyczalnia',
    component: BooksListComponent,
    children: [
      {
        path: ':bookId',
        component: BookDetailsComponent,
        canActivate: [LoadedBooksGuard],
      },
    ],
  },
  {
    path: 'archive',
    title: 'Archiwum',
    component: BooksListComponent,
    children: [
      {
        path: ':bookId',
        component: BookDetailsComponent,
        canActivate: [LoadedBooksGuard],
      },
    ],
  },
  {
    path: 'add',
    title: 'Dodaj / Edytuj',
    component: FormComponent,
  },
  { path: '', redirectTo: '/onloan', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
