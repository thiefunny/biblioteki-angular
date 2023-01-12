import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksListComponent } from './books/books-list.component';
import { DeadlinesComponent } from './deadlines/deadlines.component';
import { FormComponent } from './form/form.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { NavComponent } from './nav/nav.component';
import { MarkItDirective } from './shared/mark-it.directive';
import { ReversePipe } from './shared/reverse.pipe';
import { FiltersComponent } from './filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    MarkItDirective,
    NavComponent,
    BooksListComponent,
    LibrariesComponent,
    DeadlinesComponent,
    FormComponent,
    ReversePipe,
    FiltersComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
