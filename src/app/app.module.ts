import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details/book-details.component';
import { MarkItDirective } from './shared/mark-it.directive';



@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    MarkItDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
