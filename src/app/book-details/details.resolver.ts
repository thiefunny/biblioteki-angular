import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DetailsResolver implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot): string {
    const department = route.parent!.url[0].path;
    return department;
  }
}
