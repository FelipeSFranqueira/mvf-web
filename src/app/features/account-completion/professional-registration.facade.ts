import { Injectable } from '@angular/core';
import { ProfessionalRegistrationState } from './state/professional-registration.state';

@Injectable()
export class ProfessionalRegistrationFacade {
  constructor(private state: ProfessionalRegistrationState) {}

  registrationStep$ = this.state.registrationStep$;

  goToNextStep() {
    this.state.goToNextStep();
  }

  returnToPreviousStep() {
    this.state.returnToPreviousStep();
  }
}
