import { Component, OnInit } from '@angular/core';
import { RegistrationFormSteps } from '../../utils/form-steps';
import { ProfessionalRegistrationFacade } from '../../professional-registration.facade';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { professionalRegistrationFormGroup } from '../../utils/registration-forms';

@UntilDestroy()
@Component({
  selector: 'mvf-professional-registration',
  templateUrl: './professional-registration.html',
})
export class ProfessionalRegistrationComponent implements OnInit {
  currentStep?: RegistrationFormSteps;
  professionalRegistrationForm = professionalRegistrationFormGroup;

  readonly steps = RegistrationFormSteps;

  constructor(public facade: ProfessionalRegistrationFacade) {}

  ngOnInit(): void {
    this.facade.registrationStep$
      .pipe(untilDestroyed(this))
      .subscribe((step) => (this.currentStep = step));
  }
}
