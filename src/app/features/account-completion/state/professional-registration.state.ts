import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RegistrationFormSteps } from '../utils/form-steps';
import { Professional } from '../models/professional.model';

@Injectable()
export class ProfessionalRegistrationState {
  private _registrationStep$ = new BehaviorSubject<RegistrationFormSteps>(
    RegistrationFormSteps.UserRegistration
  );

  private _isProfessionalRegistrationLoading$ = new BehaviorSubject<boolean>(
    false
  );
  private _hasProfessionalRegistrationSucceed$ = new Subject<boolean>();
  private _hasProfessionalRegistrationFailed$ = new Subject<boolean>();

  private _professional$ = new BehaviorSubject<Professional>(undefined);

  get isProfessionalRegistrationLoading$(): Observable<boolean> {
    return this._isProfessionalRegistrationLoading$.asObservable();
  }

  get hasProfessionalRegistrationSucceed$(): Observable<boolean> {
    return this._hasProfessionalRegistrationSucceed$.asObservable();
  }

  get hasProfessionalRegistrationFailed$(): Observable<boolean> {
    return this._hasProfessionalRegistrationFailed$.asObservable();
  }

  get registrationStep$(): Observable<RegistrationFormSteps> {
    return this._registrationStep$.asObservable();
  }

  get professional$(): Observable<Professional> {
    return this._professional$.asObservable();
  }

  finishProfessionalRegistration(): void {
    this._isProfessionalRegistrationLoading$.next(true);
    this._hasProfessionalRegistrationSucceed$.next(false);
    this._hasProfessionalRegistrationFailed$.next(false);
  }

  professionalRegistrationSuccess(professional: Professional): void {
    this._professional$.next(professional);
    this._isProfessionalRegistrationLoading$.next(false);
    this._hasProfessionalRegistrationSucceed$.next(true);
    this._hasProfessionalRegistrationFailed$.next(false);
  }

  professionalRegistrationFail(): void {
    this._isProfessionalRegistrationLoading$.next(false);
    this._hasProfessionalRegistrationSucceed$.next(false);
    this._hasProfessionalRegistrationFailed$.next(true);
  }

  goToNextStep(): void {
    switch (this._registrationStep$.getValue()) {
      case RegistrationFormSteps.UserRegistration:
        this._registrationStep$.next(
          RegistrationFormSteps.DocumentsRegistration
        );
        break;
      case RegistrationFormSteps.DocumentsRegistration:
        this._registrationStep$.next(
          RegistrationFormSteps.BusinessRegistration
        );
        break;
      case RegistrationFormSteps.BusinessRegistration:
        this._registrationStep$.next(RegistrationFormSteps.ReviewData);
    }
  }

  returnToPreviousStep(): void {
    switch (this._registrationStep$.getValue()) {
      case RegistrationFormSteps.ReviewData:
        this._registrationStep$.next(
          RegistrationFormSteps.BusinessRegistration
        );
        break;
      case RegistrationFormSteps.BusinessRegistration:
        this._registrationStep$.next(
          RegistrationFormSteps.DocumentsRegistration
        );
        break;
      case RegistrationFormSteps.DocumentsRegistration:
        this._registrationStep$.next(RegistrationFormSteps.UserRegistration);
        break;
    }
  }
}
