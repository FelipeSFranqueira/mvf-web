import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegistrationFormSteps } from '../utils/form-steps';

@Injectable()
export class ProfessionalRegistrationState {
  private _registrationStep$ = new BehaviorSubject<RegistrationFormSteps>(
    RegistrationFormSteps.UserRegistration
  );

  get registrationStep$(): Observable<RegistrationFormSteps> {
    return this._registrationStep$.asObservable();
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
