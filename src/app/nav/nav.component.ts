import { Component } from '@angular/core';
import { routes } from '../app-routing.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent {
  _nav: { title: string; path: string }[] = [];

  ngOnInit() {
    // nav from routes
    routes.forEach((route) => {
      if (route.title) {
        this._nav.push({
          title: route.title as string,
          path: route.path as string,
        });
      }
    });
  }

  get nav() {
    return this._nav;
  }
}
