import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Request } from '../models/request.model';

@Injectable()
export class RequestsState {
  private _isRequestLoading$ = new BehaviorSubject<boolean>(false);
  private _hasRequestSucceed$ = new Subject<boolean>();
  private _hasRequestFailed$ = new Subject<boolean>();

  get isRequestLoading$(): Observable<boolean> {
    return this._isRequestLoading$.asObservable();
  }

  get hasRequestSucceed$(): Observable<boolean> {
    return this._hasRequestSucceed$.asObservable();
  }

  get hasRequestFailed$(): Observable<boolean> {
    return this._hasRequestFailed$.asObservable();
  }

  requestService(): void {
    this._isRequestLoading$.next(true);
    this._hasRequestSucceed$.next(false);
    this._hasRequestFailed$.next(false);
  }

  requestSuccess(): void {
    this._isRequestLoading$.next(false);
    this._hasRequestSucceed$.next(true);
    this._hasRequestFailed$.next(false);
  }

  requestFail(): void {
    this._isRequestLoading$.next(false);
    this._hasRequestSucceed$.next(false);
    this._hasRequestFailed$.next(true);
  }
}
