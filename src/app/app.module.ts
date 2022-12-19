import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArchiveComponent } from './archive/archive.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksComponent } from './books/books.component';
import { DeadlinesComponent } from './deadlines/deadlines.component';
import { FormComponent } from './form/form.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { NavComponent } from './nav/nav.component';
import { MarkItDirective } from './shared/mark-it.directive';
import { ReversePipe } from './shared/reverse.pipe';

export const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
    children: [
      {
        path: ':bookId',
        component: BookDetailsComponent,
      },
    ],
  },
  {
    path: 'archive',
    component: BooksComponent,
  },
  {
    path: 'deadlines',
    component: DeadlinesComponent,
  },
  {
    path: 'libraries',
    component: LibrariesComponent,
  },
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
  declarations: [
    AppComponent,
    BookDetailsComponent,
    MarkItDirective,
    NavComponent,
    BooksComponent,
    LibrariesComponent,
    DeadlinesComponent,
    FormComponent,
    ReversePipe,
    ArchiveComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
