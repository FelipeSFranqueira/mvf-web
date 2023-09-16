import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class AuthenticationState {
  private _isRegistering$ = new BehaviorSubject<boolean>(false);
  private _isRegistered$ = new BehaviorSubject<boolean>(false);
  private _error$ = new BehaviorSubject<boolean>(false);
  private _loginLoading$ = new Subject<boolean>();
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

  register(): void {
    this._isRegistering$.next(true);
  }

  finishRegister(): void {
    this._isRegistering$.next(false);
    this._isRegistered$.next(true);
  }

  dispatchError(): void {
    this._error$.next(true);
    this._isRegistering$.next(false);
  }

  login(): void {
    this._loginLoading$.next(true);
  }

  finishLogin(): void {
    this._loginLoading$.next(false);
    this._loginError$.next(false);
    this._loginSuccess$.next(true);
  }

  dispatchLoginError(): void {
    this._loginError$.next(true);
    this._loginLoading$.next(false);
    this._loginSuccess$.next(false);
  }
}
