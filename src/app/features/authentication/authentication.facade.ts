import { Injectable } from '@angular/core';
import { AuthenticationService } from './api/authentication.service';
import { AuthenticationState } from './state/authentication.state';
import { User } from '../../shared/models/user';

@Injectable()
export class AuthenticationFacade {
  constructor(
    private authenticationService: AuthenticationService,
    private state: AuthenticationState
  ) {}

  isRegistering$ = this.state.isRegistering$;
  isRegistered$ = this.state.isRegistered$;
  error$ = this.state.error$;

  register(user: User) {
    this.state.register();
    this.authenticationService.register(user).subscribe({
      next: () => this.state.finishRegister(),
      error: () => this.state.dispatchError(),
    });
  }
}
