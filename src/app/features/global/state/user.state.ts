import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserState {
  private _user$ = new BehaviorSubject<User | undefined>(undefined);

  get user$() {
    return this._user$.asObservable();
  }

  setUser(user: User) {
    this._user$.next(user);
  }
}
