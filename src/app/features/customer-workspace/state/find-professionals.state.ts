import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FoundProfessional } from '../models/found-professional.model';

@Injectable()
export class FindProfessionalsState {
  private _isSearchLoading$ = new BehaviorSubject<boolean>(false);
  private _hasSearchFailed$ = new Subject<boolean>();
  private _hasSearchSucceed$ = new Subject<boolean>();

  private _searchResults$ = new BehaviorSubject<FoundProfessional[]>([]);

  get isSearchLoading$(): Observable<boolean> {
    return this._isSearchLoading$.asObservable();
  }

  get hasSearchFailed$(): Observable<boolean> {
    return this._hasSearchFailed$.asObservable();
  }

  get hasSearchSucceed$(): Observable<boolean> {
    return this._hasSearchSucceed$.asObservable();
  }

  get searchResults$(): Observable<FoundProfessional[]> {
    return this._searchResults$.asObservable();
  }

  findProfessionals(): void {
    this._isSearchLoading$.next(true);
    this._hasSearchSucceed$.next(false);
    this._hasSearchFailed$.next(false);
    this._searchResults$.next([]);
  }

  searchSuccess(result: FoundProfessional[]): void {
    this._isSearchLoading$.next(false);
    this._hasSearchSucceed$.next(true);
    this._hasSearchFailed$.next(false);
    this._searchResults$.next(result);
  }

  searchFailed(): void {
    this._isSearchLoading$.next(false);
    this._hasSearchSucceed$.next(false);
    this._hasSearchFailed$.next(true);
    this._searchResults$.next([]);
  }
}
