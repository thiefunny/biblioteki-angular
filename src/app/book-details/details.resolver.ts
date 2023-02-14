import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsResolver implements Resolve<string> {
  // próbuję przekazać w jakim jestem dziale przed załadowaniem book-details, żeby było wiadomo, skąd mam kasować książkę, ale nie udaje mi się
  resolve(route: ActivatedRouteSnapshot): string {
    const department = route.parent!.url[0].path;
    return department;
  }
}
