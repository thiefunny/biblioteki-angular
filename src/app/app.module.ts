import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksComponent } from './books/books.component';
import { DeadlinesComponent } from './deadlines/deadlines.component';
import { FormComponent } from './form/form.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { NavComponent } from './nav/nav.component';
import { MarkItDirective } from './shared/mark-it.directive';
import { ReversePipe } from './shared/reverse.pipe';

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
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
