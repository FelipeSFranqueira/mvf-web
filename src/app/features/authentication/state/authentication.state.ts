import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

/**
 * Classe que armazena o estado de autenticação do usuário.
 */
@Injectable()
export class AuthenticationState {
  private _isRegistering$ = new BehaviorSubject<boolean>(false);
  private _isRegistered$ = new BehaviorSubject<boolean>(false);
  private _error$ = new BehaviorSubject<boolean>(false);
  private _loginLoading$ = new BehaviorSubject<boolean>(false);
  private _loginSuccess$ = new Subject<boolean>();
  private _loginError$ = new Subject<boolean>();

  get isRegistering$(): Observable<boolean> {
    return this._isRegistering$.asObservable();
  }

  get isRegistered$(): Observable<boolean> {
    return this._isRegistered$.asObservable();
  }

  get error$(): Observable<boolean> {
    return this._error$.asObservable();
  }

  get loginLoading$(): Observable<boolean> {
    return this._loginLoading$.asObservable();
  }

  get loginSuccess$(): Observable<boolean> {
    return this._loginSuccess$.asObservable();
  }

  get loginError$(): Observable<boolean> {
    return this._loginError$.asObservable();
  }

  /**
   * Atualiza o estado quando se está registrando um usuário.
   */
  register(): void {
    this._isRegistering$.next(true);
  }

  /**
   * Atualiza o estado correspondente à finalizaçào do registro de usuário.
   */
  finishRegister(): void {
    this._isRegistering$.next(false);
    this._isRegistered$.next(true);
  }

  /**
   * Atualiza o estado correspondente ao recebimento de um erro pela API.
   */
  dispatchError(): void {
    this._error$.next(true);
    this._isRegistering$.next(false);
  }

  /**
   * Atualiza o estado correspondente à um usuário entrando no sistema.
   */
  login(): void {
    this._loginLoading$.next(true);
  }

  /**
   * Atualiza o estado correspondente à quando o usuário termina o login.
   */
  finishLogin(): void {
    this._loginLoading$.next(false);
    this._loginError$.next(false);
    this._loginSuccess$.next(true);
  }

  /**
   * Atualiza o estado correspondente à quando um erro é recebido após tentativa
   * de login.
   */
  dispatchLoginError(): void {
    this._loginError$.next(true);
    this._loginLoading$.next(false);
    this._loginSuccess$.next(false);
  }
}
