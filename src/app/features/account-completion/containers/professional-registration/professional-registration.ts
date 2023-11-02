import { Component, OnInit } from '@angular/core';
import { RegistrationFormSteps } from '../../utils/form-steps';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { professionalRegistrationFormGroup } from '../../utils/registration-forms';
import { ProfessionalRegistrationFacade } from '../../facade/professional-registration.facade';
import { Professional } from '../../models/professional.model';
import { AuthenticationFacade } from '../../../authentication/authentication.facade';
import { User } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StateCityFacade } from '../../facade/state-city.facade';
import { City, State } from '../../models/state-city.model';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'mvf-professional-registration',
  templateUrl: './professional-registration.html',
})
export class ProfessionalRegistrationComponent implements OnInit {
  currentStep?: RegistrationFormSteps;
  professionalRegistrationForm = professionalRegistrationFormGroup;

  states$: Observable<State[]>;
  cities$: Observable<City[]>;
  isStateCityLoading$: Observable<boolean>;

  readonly steps = RegistrationFormSteps;
  private user: User;

  constructor(
    public facade: ProfessionalRegistrationFacade,
    private authFacade: AuthenticationFacade,
    private stateCityFacade: StateCityFacade,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authFacade.user$.subscribe((user) => (this.user = user));

    this.states$ = this.stateCityFacade.states$;
    this.cities$ = this.stateCityFacade.cities$;
    this.isStateCityLoading$ = this.stateCityFacade.isStateCityLoading$;

    this.stateCityFacade.getStates();

    this.stateCityFacade.hasStateCityFailed$
      .pipe(untilDestroyed(this))
      .subscribe((fail) =>
        fail
          ? this.toastr.error(
              'Houve um erro enquanto buscávamos as cidades e estados disponíveis. Tente novamente mais tarde ou contate o suporte.'
            )
          : null
      );

    this.facade.registrationStep$
      .pipe(untilDestroyed(this))
      .subscribe((step) => (this.currentStep = step));
    this.facade.hasProfessionalRegistrationSucceed$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.toastr.success('Registro finalizado com sucesso!');
      });
  }

  finishRegistration(): void {
    const newProfessional: Professional = {
      users_id: 'this.user.id',
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

    console.log(newProfessional);
  }

  getCitiesByState(state: string): void {
    console.log('get');
    this.stateCityFacade.getCitiesByState(state);
  }
}
