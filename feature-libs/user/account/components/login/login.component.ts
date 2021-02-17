import { Component, OnInit } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user$: Observable<User>;

  constructor(
    private auth: AuthService,
    private userService: UserAccountFacade
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.isUserLoggedIn().pipe(
      switchMap((isUserLoggedIn) => {
        if (isUserLoggedIn) {
          return this.userService.get();
        } else {
          return of(undefined);
        }
      })
    );
  }
}