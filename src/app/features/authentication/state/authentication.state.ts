import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthenticationState {
  private _isRegistering$ = new BehaviorSubject<boolean>(false);
  private _isRegistered$ = new BehaviorSubject<boolean>(false);
  private _error$ = new BehaviorSubject<boolean>(false);

  get isRegistering$(): Observable<boolean> {
    return this._isRegistering$.asObservable();
  }

  get isRegistered$(): Observable<boolean> {
    return this._isRegistered$.asObservable();
  }

  get error$(): Observable<boolean> {
    return this._error$.asObservable();
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
}
