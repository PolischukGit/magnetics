import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FakeService } from '../services/fake.service';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  constructor(private service: FakeService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('user')) {
      this.service.isUserAuth = true;
    }
    if (this.service.isUserAuth) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
