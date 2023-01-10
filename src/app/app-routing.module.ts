import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books/books-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { FormComponent } from './form/form.component';
import { DeadlinesComponent } from './deadlines/deadlines.component';
import { LibrariesComponent } from './libraries/libraries.component';

export const routes: Routes = [
  {
    path: 'onloan',
    component: BooksListComponent,
    children: [
      {
        path: ':bookId',
        component: BookDetailsComponent,
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
      },
    ],
  },
  // {
  //   path: 'deadlines',
  //   component: DeadlinesComponent,
  // },
  // {
  //   path: 'libraries',
  //   component: LibrariesComponent,
  // },
  {
    path: 'add',
    component: FormComponent,
  },
  // {
  //   path: '',
  //   component: AppComponent
  // }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
