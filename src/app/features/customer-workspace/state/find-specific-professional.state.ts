import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FoundProfessional } from '../models/found-professional.model';

@Injectable()
export class FindSpecificProfessionalState {
  private _isSearchLoading$ = new BehaviorSubject<boolean>(false);
  private _hasSearchSucceed$ = new Subject<boolean>();
  private _hasSearchFailed$ = new Subject<boolean>();

  private _searchResult$ = new BehaviorSubject<FoundProfessional | undefined>(
    undefined
  );

  get isSearchLoading$(): Observable<boolean> {
    return this._isSearchLoading$.asObservable();
  }

  get hasSearchSucceed$(): Observable<boolean> {
    return this._hasSearchSucceed$.asObservable();
  }

  get hasSearchFailed$(): Observable<boolean> {
    return this._hasSearchFailed$.asObservable();
  }

  get searchResult$(): Observable<FoundProfessional | undefined> {
    return this._searchResult$.asObservable();
  }

  searchProfessional(): void {
    this._isSearchLoading$.next(true);
    this._hasSearchFailed$.next(false);
    this._hasSearchSucceed$.next(false);
  }

  searchSuccess(result: FoundProfessional): void {
    this._isSearchLoading$.next(false);
    this._hasSearchFailed$.next(false);
    this._hasSearchSucceed$.next(true);
    this._searchResult$.next(result);
  }

  searchFail(): void {
    this._isSearchLoading$.next(false);
    this._hasSearchFailed$.next(true);
    this._hasSearchSucceed$.next(false);
  }
}
