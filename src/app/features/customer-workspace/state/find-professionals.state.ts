import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FoundProfessional } from '../models/found-professional.model';

/**
 * Classe de estado da funcionalidade de FindProfessionals (busca
 * por profissionais).
 */
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

  /**
   * Atualiza o estado que corresponde à ação de busca de profissionais.
   */
  findProfessionals(): void {
    this._isSearchLoading$.next(true);
    this._hasSearchSucceed$.next(false);
    this._hasSearchFailed$.next(false);
    this._searchResults$.next([]);
  }

  /**
   * Atualiza o estado que corresponde ao sucesso da busca por profissionais.
   * @param result
   */
  searchSuccess(result: FoundProfessional[]): void {
    this._isSearchLoading$.next(false);
    this._hasSearchSucceed$.next(true);
    this._hasSearchFailed$.next(false);
    this._searchResults$.next(result);
  }

  /**
   * Atualiza o estado que corresponde à falha na busca por profissionais.
   */
  searchFailed(): void {
    this._isSearchLoading$.next(false);
    this._hasSearchSucceed$.next(false);
    this._hasSearchFailed$.next(true);
    this._searchResults$.next([]);
  }
}
