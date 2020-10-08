import { Component, OnInit } from '@angular/core';
import { User } from '../../components/login/login.component';
import { FakeService } from '../../services/fake.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  template: `
    <p>Hello {{ user.login }}</p>
    <p>
      <button mat-raised-button color="warn" (click)="logout()">LOGOUT</button>
    </p>
  `,
  styles: [
    `
      p {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class MainComponent implements OnInit {
  user: User;

  constructor(private service: FakeService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.service.user;
  }

  logout(): void {
    this.service
      .logout()
      .pipe(first())
      .subscribe(() => {
        this.router.navigateByUrl('login');
      });
  }
}
