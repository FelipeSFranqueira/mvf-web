import { Injectable } from '@angular/core';
import { AuthenticationService } from './api/authentication.service';
import { AuthenticationState } from './state/authentication.state';
import { User } from '../../shared/models/user';
import { LoginRequest } from './models/login-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticationFacade {
  constructor(
    private authenticationService: AuthenticationService,
    private state: AuthenticationState,
    private cookieService: CookieService
  ) {}

  isRegistering$ = this.state.isRegistering$;
  isRegistered$ = this.state.isRegistered$;
  error$ = this.state.error$;
  loginLoading$ = this.state.loginLoading$;
  loginSuccess$ = this.state.loginSuccess$;
  loginError$ = this.state.loginError$;

  register(user: User): void {
    this.state.register();
    this.authenticationService.register(user).subscribe({
      next: () => this.state.finishRegister(),
      error: () => this.state.dispatchError(),
    });
  }

  login(loginRequest: LoginRequest): void {
    this.state.login();
    this.authenticationService.login(loginRequest).subscribe({
      next: (loginResponse) => {
        this.state.finishLogin();
        this.setTokenCookie(loginResponse.authToken);
      },
      error: () => this.state.dispatchLoginError(),
    });
  }

  private setTokenCookie(token: string): void {
    this.cookieService.set('jwt', token);
  }
}
