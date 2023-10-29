import { Component, OnInit } from '@angular/core';
import { RegistrationFormSteps } from '../../utils/form-steps';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { professionalRegistrationFormGroup } from '../../utils/registration-forms';
import { ProfessionalRegistrationFacade } from '../../facade/professional-registration.facade';
import { Professional } from '../../models/professional.model';
import { AuthenticationFacade } from '../../../authentication/authentication.facade';
import { User } from '../../../../shared/models/user.model';

@UntilDestroy()
@Component({
  selector: 'mvf-professional-registration',
  templateUrl: './professional-registration.html',
})
export class ProfessionalRegistrationComponent implements OnInit {
  currentStep?: RegistrationFormSteps;
  professionalRegistrationForm = professionalRegistrationFormGroup;

  readonly steps = RegistrationFormSteps;
  private user: User;

  constructor(
    public facade: ProfessionalRegistrationFacade,
    private authFacade: AuthenticationFacade
  ) {}

  ngOnInit(): void {
    this.authFacade.user$.subscribe((user) => (this.user = user));

    this.facade.registrationStep$
      .pipe(untilDestroyed(this))
      .subscribe((step) => (this.currentStep = step));
  }

  finishRegistration(): void {
    const newProfessional: Professional = {
      users_id: this.user.id,
      ...(this.professionalRegistrationForm.value as Professional),
      // cpf: this.professionalRegistrationForm.controls.cpf.value,
      // preferredName: this.professionalRegistrationForm.controls.preferredName.value,
      // cnhImage: this.professionalRegistrationForm.controls.cnhImage.value,
      // userHoldingCnhImage: this.professionalRegistrationForm.controls.userHoldingCnhImage.value,
      // cnhNumber: this.professionalRegistrationForm.controls.cnhNumber.value,
      // cnhCategory: this.professionalRegistrationForm.controls.cnhCategory.value,
      // baseValue: this.professionalRegistrationForm.controls.baseValue.value,
      // valuePerKm: this.professionalRegistrationForm.controls.valuePerKm.value,
      // supportedState: this.professionalRegistrationForm.controls.supportedState.value,
      // supportedCities: this.professionalRegistrationForm.controls.supportedCities.value
    };
  }
}
