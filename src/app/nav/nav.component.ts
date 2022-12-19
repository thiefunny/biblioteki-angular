import { Component } from '@angular/core';
import { routes } from '../app.module';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  get nav(): string[] {
    const _routes = routes;
    const _nav: string[] = [];
    _routes.forEach((route) => _nav.push(route.path as string));
    return _nav;
  }
}
