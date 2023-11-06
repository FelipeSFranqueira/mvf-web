import { Injectable } from '@angular/core';
import { AuthenticationService } from './api/authentication.service';
import { AuthenticationState } from './state/authentication.state';
import { RegistrationUser } from './models/registration-user.model';
import { LoginRequest } from './models/login-request.model';
import { CookieService } from 'ngx-cookie-service';
import { UserState } from '../../shared/state/user.state';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

/**
 * Classe Facade que serve como interface entre os componentes
 * e os serviços de estado e chamadas à API.
 */
@Injectable()
export class AuthenticationFacade {
  constructor(
    private authenticationService: AuthenticationService,
    private authState: AuthenticationState,
    private userState: UserState,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {}

  isRegistering$ = this.authState.isRegistering$;
  isRegistered$ = this.authState.isRegistered$;
  error$ = this.authState.error$;
  loginLoading$ = this.authState.loginLoading$;
  loginSuccess$ = this.authState.loginSuccess$;
  loginError$ = this.authState.loginError$;

  user$ = this.userState.user$;

  /**
   * Registra um usuário, chamando o service que se comunica com a API
   * e alterando o estado.
   * @param user
   */
  register(user: RegistrationUser): void {
    this.authState.register();
    this.authenticationService.register(user).subscribe({
      next: () => this.authState.finishRegister(),
      error: (err: HttpErrorResponse) => {
        this.authState.dispatchError();
        if (
          err.error.code === 'ERROR_CODE_INPUT_ERROR' &&
          err.error.payload.param === 'password'
        ) {
          this.toastr.error(
            'Senha fraca. Sua senha deve conter no mínimo 8 caracteres, misturando letras, números e caracteres especiais.'
          );
        } else {
          this.toastr.error(
            'Ocorreu um erro ao criar sua conta. Tente novamente mais tarde ou contate o suporte.'
          );
        }
      },
    });
  }

  /**
   * Método responsável por logar o usuário.
   * Chama o service que se comunica com a API e manipula adequadamente
   * o estado da aplicação.
   * @param loginRequest
   */
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

  populateUserFromJwt(): void {
    this.authenticationService.populateUser().subscribe({
      next: (user) => {
        this.userState.setUser(user);
        this.authState.finishLogin();
      },
      error: () => this.authState.dispatchLoginError(),
    });
  }

  /**
   * Armazena o token JWT (token de autenticação) em um cookie no navegador
   * do usuário.
   * @param token
   */
  private setTokenCookie(token: string): void {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    this.cookieService.set('jwt', token, expirationDate);
  }
}
