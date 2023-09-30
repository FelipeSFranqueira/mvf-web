import { Injectable } from '@angular/core';
import { AuthenticationService } from './api/authentication.service';
import { AuthenticationState } from './state/authentication.state';
import { User } from '../../shared/models/user';
import { LoginRequest } from './models/login-request.model';
import { CookieService } from 'ngx-cookie-service';
import { UserState } from '../global/state/user.state';

@Injectable()
export class AuthenticationFacade {
  constructor(
    private authenticationService: AuthenticationService,
    private authState: AuthenticationState,
    private userState: UserState,
    private cookieService: CookieService
  ) {}

  isRegistering$ = this.authState.isRegistering$;
  isRegistered$ = this.authState.isRegistered$;
  error$ = this.authState.error$;
  loginLoading$ = this.authState.loginLoading$;
  loginSuccess$ = this.authState.loginSuccess$;
  loginError$ = this.authState.loginError$;

  register(user: User): void {
    this.authState.register();
    this.authenticationService.register(user).subscribe({
      next: () => this.authState.finishRegister(),
      error: () => this.authState.dispatchError(),
    });
  }

  login(loginRequest: LoginRequest): void {
    this.authState.login();
    this.authenticationService.login(loginRequest).subscribe({
      next: (loginResponse) => {
        this.setTokenCookie(loginResponse.authToken);

        this.authenticationService.populateUser().subscribe({
          next: (user) => {
            this.userState.setUser(user);
            this.authState.finishLogin();
          },
          error: () => this.authState.dispatchLoginError(),
        });
      },
      error: () => this.authState.dispatchLoginError(),
    });
  }

  private setTokenCookie(token: string): void {
    this.cookieService.set('jwt', token);
  }
}