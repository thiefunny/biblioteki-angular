import { Component, OnInit } from '@angular/core';
import { routes } from '../app-routing.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  _nav: { title: string; path: string }[] = [];

  ngOnInit() {
    // Routes przerabiam na menu ;) wygląda to max dziwnie, da się prościej?
    // - dodałem do definicji route'a flagę decydującą, czy robimy z tego nav link
    // - sprawdzam, czy title jest typu string
    routes.forEach(({title, path, nav}) => {
      if (nav && title && path && typeof(title) === 'string') {
        this._nav.push({title, path});
      }
    });
  }

  get nav() {
    return this._nav;
  }
}
