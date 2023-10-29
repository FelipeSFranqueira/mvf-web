import { Injectable } from '@angular/core';

import { ProfessionalRegistrationService } from '../api/professional-registration.service';
import { ProfessionalRegistrationState } from '../state/professional-registration.state';
import { Professional } from '../models/professional.model';

@Injectable()
export class ProfessionalRegistrationFacade {
  constructor(
    private service: ProfessionalRegistrationService,
    private state: ProfessionalRegistrationState
  ) {}

  registrationStep$ = this.state.registrationStep$;

  isProfessionalRegistrationLoading$ =
    this.state.isProfessionalRegistrationLoading$;
  hasProfessionalRegistrationSucceed$ =
    this.state.hasProfessionalRegistrationSucceed$;
  hasProfessionalRegistrationFailed$ =
    this.state.hasProfessionalRegistrationFailed$;

  finishProfessionalRegistration(professional: Professional): void {
    this.state.finishProfessionalRegistration();

    this.service.finishRegistration(professional).subscribe({
      next: (professional) => {
        this.state.professionalRegistrationSuccess();
      },
      error: () => {
        this.state.professionalRegistrationFail();
      },
    });
  }

  goToNextStep() {
    this.state.goToNextStep();
  }

  returnToPreviousStep() {
    this.state.returnToPreviousStep();
  }
}
