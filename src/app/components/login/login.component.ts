import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { FakeService } from '../../services/fake.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface ILoginData {
  login: string;
  password: string;
}

export interface User {
  login: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginFormGroup: FormGroup;
  private errorEmitter$ = new Subject<string>();
  error$: Observable<string>;

  constructor(private service: FakeService, private router: Router) {
    this.loginFormGroup = new FormGroup({
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    this.error$ = this.errorEmitter$.asObservable();
  }

  submit(): void {
    if (!this.loginFormGroup.valid) {
      this.errorEmitter$.next('Wrong Login or Password!');
    } else {
      this.errorEmitter$.next(null);
      this.service
        .loginUser(this.loginFormGroup.value)
        .pipe(first())
        .subscribe(
          () => {
            this.router.navigateByUrl('main');
          },
          (error) => {
            this.errorEmitter$.next(error);
          },
        );
    }
  }
}
