import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksListComponent } from './books/books-list.component';
import { EditComponent } from './edit/edit.component';
import { LoadedBooksGuard } from './shared/loaded-books.guard';
import { EditResolver } from './edit/resolver/edit-resolver.resolver';
import { DetailsResolver } from './book-details/details.resolver';

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
        resolve: { department: DetailsResolver },
      },
    ],
  },
  {
    path: 'archive',
    title: 'Archiwum',
    component: BooksListComponent,
    // dwa razy mam path :bookId, dla każdego komponenntu / działu osobno, da się zapisać w jednym?
    children: [
      {
        path: ':bookId',
        component: BookDetailsComponent,
        canActivate: [LoadedBooksGuard],
      },
    ],
  },
  {
    path: 'edit/:bookId',
    title: 'Dodaj / Edytuj',
    component: EditComponent,
  },
  { path: '', redirectTo: '/onloan', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
