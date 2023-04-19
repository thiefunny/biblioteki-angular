import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksListComponent } from './books/books-list.component';
import { EditComponent } from './edit/edit.component';
import { NavComponent } from './nav/nav.component';
import { FiltersComponent } from './ui/filters/filters.component';
import { SortingComponent } from './ui/sorting/sorting.component';

@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    NavComponent,
    BooksListComponent,
    EditComponent,
    FiltersComponent,
    SortingComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
