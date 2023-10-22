import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable()
export class CustomerRegistrationState {
  private _isCustomerRegistrationLoading$ = new BehaviorSubject<boolean>(false);
  private _hasCustomerRegistrationSucceed$ = new Subject<boolean>();
  private _hasCustomerRegistrationFailed$ = new Subject<boolean>();

  private _customer$ = new BehaviorSubject<Customer | undefined>(undefined);

  get isCustomerRegistrationLoading$(): Observable<boolean> {
    return this._isCustomerRegistrationLoading$.asObservable();
  }

  get hasCustomerRegistrationSucceed$(): Observable<boolean> {
    return this._hasCustomerRegistrationSucceed$.asObservable();
  }

  get hasCustomerRegistrationFailed$(): Observable<boolean> {
    return this._hasCustomerRegistrationFailed$.asObservable();
  }

  get customer$(): Observable<Customer | undefined> {
    return this._customer$.asObservable();
  }

  finishCustomerRegistration(): void {
    this._isCustomerRegistrationLoading$.next(true);
    this._hasCustomerRegistrationSucceed$.next(false);
    this._hasCustomerRegistrationFailed$.next(false);
  }

  customerRegistrationSuccess(customer: Customer): void {
    this._isCustomerRegistrationLoading$.next(false);
    this._hasCustomerRegistrationSucceed$.next(true);
    this._hasCustomerRegistrationFailed$.next(false);
  }

  customerRegistrationFail(): void {
    this._isCustomerRegistrationLoading$.next(false);
    this._hasCustomerRegistrationSucceed$.next(false);
    this._hasCustomerRegistrationFailed$.next(true);
  }
}
