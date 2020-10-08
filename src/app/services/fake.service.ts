import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ILoginData, User } from '../components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class FakeService {
  private readonly userData: ILoginData = {
    login: 'user',
    password: '1234567890',
  };

  private isAuth = false;

  get isUserAuth(): boolean {
    return this.isAuth;
  }

  set isUserAuth(value: boolean) {
    this.isAuth = value;
  }

  get user(): User {
    return this.userData;
  }

  constructor() {}

  loginUser(data: ILoginData): Observable<User> {
    if (data.login === this.userData.login && data.password === this.userData.password) {
      this.isAuth = true;
      localStorage.setItem('user', JSON.stringify(this.userData));
      return of({ ...data } as User);
    } else {
      return throwError('User not found');
    }
  }

  logout(): Observable<boolean> {
    this.isAuth = false;
    localStorage.removeItem('user');
    return of(true);
  }
}
