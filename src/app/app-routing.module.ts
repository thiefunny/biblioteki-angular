import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books/books-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FormComponent } from './form/form.component';
import { LoadedBooksGuard } from './shared/loaded-books.guard';

export const routes: Routes = [
  {
    path: 'onloan',
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
    component: FormComponent,
  },
  { path: '', redirectTo: '/onloan', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
