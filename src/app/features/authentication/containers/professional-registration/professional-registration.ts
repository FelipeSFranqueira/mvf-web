import { Component, OnInit } from '@angular/core';
import { RegistrationFormSteps } from '../../utils/form-steps';
import { ProfessionalRegistrationFacade } from '../../professional-registration.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'mvf-professional-registration',
  templateUrl: './professional-registration.html',
})
export class ProfessionalRegistrationComponent implements OnInit {
  currentStep?: RegistrationFormSteps;

  readonly steps = RegistrationFormSteps;

  constructor(public facade: ProfessionalRegistrationFacade) {}

  ngOnInit(): void {
    this.facade.registrationStep$
      .pipe(untilDestroyed(this))
      .subscribe((step) => (this.currentStep = step));
  }
}
