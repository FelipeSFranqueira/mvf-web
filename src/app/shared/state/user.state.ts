import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

/**
 * Classe que armazena o estado do usuário.
 */
@Injectable()
export class UserState {
  /**
   * Usuário armazenado.
   */
  private _user$ = new BehaviorSubject<User | undefined>(undefined);

  /**
   * Retorna o usuário (BehaviorSubject) como um Observable
   * @returns {Observable<User>} Observable da interface User
   */
  get user$() {
    return this._user$.asObservable();
  }

  setUser(user: User) {
    this._user$.next(user);
  }
}
