import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArchiveComponent } from './books/archive/archive.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksListComponent } from './books/books-list.component';
import { DeadlinesComponent } from './deadlines/deadlines.component';
import { FormComponent } from './form/form.component';
import { LibrariesComponent } from './libraries/libraries.component';
import { NavComponent } from './nav/nav.component';
import { MarkItDirective } from './shared/mark-it.directive';
import { ReversePipe } from './shared/reverse.pipe';
import { AppRoutingModule } from './app-routing.module';
import { OnLoanComponent } from './books/on-loan/on-loan.component';

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
    ArchiveComponent,
    OnLoanComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
