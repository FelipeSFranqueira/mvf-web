import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { City, State } from '../models/state-city.model';

@Injectable()
export class StateCityState {
  private _states$ = new BehaviorSubject<State[]>([]);
  private _cities$ = new BehaviorSubject<City[]>([]);

  private _isStateCityLoading$ = new BehaviorSubject<boolean>(false);
  private _hasStateCitySucceed$ = new Subject<boolean>();
  private _hasStateCityFailed$ = new Subject<boolean>();

  get states$(): Observable<State[]> {
    return this._states$.asObservable();
  }

  get cities$(): Observable<City[]> {
    return this._cities$.asObservable();
  }

  get isStateCityLoading$(): Observable<boolean> {
    return this._isStateCityLoading$.asObservable();
  }

  get hasStateCitySucceed$(): Observable<boolean> {
    return this._hasStateCitySucceed$.asObservable();
  }

  get hasStateCityFailed$(): Observable<boolean> {
    return this._hasStateCityFailed$.asObservable();
  }

  getStateOrCity(): void {
    this._isStateCityLoading$.next(true);
    this._hasStateCitySucceed$.next(false);
    this._hasStateCityFailed$.next(false);
  }

  stateSuccess(states: State[]): void {
    this._states$.next(states);
    this._isStateCityLoading$.next(false);
    this._hasStateCitySucceed$.next(true);
    this._hasStateCityFailed$.next(false);
  }

  stateFail(): void {
    this._isStateCityLoading$.next(false);
    this._hasStateCitySucceed$.next(false);
    this._hasStateCityFailed$.next(true);
  }

  citySuccess(cities: City[]): void {
    this._cities$.next(cities);
    this._isStateCityLoading$.next(false);
    this._hasStateCitySucceed$.next(true);
    this._hasStateCityFailed$.next(false);
  }

  cityFail(): void {
    this._isStateCityLoading$.next(false);
    this._hasStateCitySucceed$.next(false);
    this._hasStateCityFailed$.next(true);
  }
}
