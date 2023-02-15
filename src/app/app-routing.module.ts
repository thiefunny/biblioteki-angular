import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksListComponent } from './books/books-list.component';
import { EditComponent } from './edit/edit.component';
import { LoadedBooksGuard } from './shared/loaded-books.guard';
import { EditResolver } from './edit/resolver/edit-resolver.resolver';
import { DetailsResolver } from './book-details/details.resolver';

interface AppRoute extends Route {
  nav?: boolean;
}

export const routes: AppRoute[] = [
  {
    nav: true,
    path: 'onloan',
    title: 'Wypożyczalnia',
    component: BooksListComponent,
    children: [
      {
        path: ':bookId',
        component: BookDetailsComponent,
        canActivate: [LoadedBooksGuard],
        data: {department: 'onload'}
        // resolve: { department: DetailsResolver },
      },
    ],
  },
  {
    nav: true,
    path: 'archive',
    title: 'Archiwum',
    component: BooksListComponent,
    // dwa razy mam path :bookId, dla każdego komponenntu / działu osobno, da się zapisać w jednym?
    // - można zdefiniować to jako osobny obiekt i użyć go w obu kontekstach
    // - można utworzyć route'a, który nie będzie childem
    // - można zaimplementować matcher, który dopasuje onloan i archive w pierwszym segmencie
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
