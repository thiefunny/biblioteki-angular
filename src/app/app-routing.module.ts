import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { DetailsResolver } from './book-details/details.resolver';
import { BooksListComponent } from './books/books-list.component';
import { EditComponent } from './edit/edit.component';
import { LoadedBooksGuard } from './shared/loaded-books.guard';

export const routes: Routes = [
  {
    path: 'onloan',
    title: 'Wypożyczone',
    component: BooksListComponent,
    children: [
      {
        path: ':bookId',
        component: BookDetailsComponent,
        canActivate: [LoadedBooksGuard],
        resolve: { department: DetailsResolver },
        data: {department: 'onload'}
      },
    ],
  },
  {
    path: 'archive',
    title: 'Oddane',
    component: BooksListComponent,
    children: [
      {
        path: ':bookId',
        component: BookDetailsComponent,
        canActivate: [LoadedBooksGuard],
        data: {department: 'archive'}

      },
    ],
  },
  {
    path: 'edit/:bookId',
    title: 'Dodaj / Edytuj książkę',
    component: EditComponent,
  },
  { path: '', redirectTo: '/onloan', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
