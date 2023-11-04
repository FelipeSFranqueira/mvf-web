import { Component, OnInit } from '@angular/core';
import { RegistrationFormSteps } from '../../utils/form-steps';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { professionalRegistrationFormGroup } from '../../utils/registration-forms';
import { ProfessionalRegistrationFacade } from '../../facade/professional-registration.facade';
import { AuthenticationFacade } from '../../../authentication/authentication.facade';
import { User } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StateCityFacade } from '../../facade/state-city.facade';
import { City, State } from '../../models/state-city.model';
import { Observable } from 'rxjs';
import { professionalAndVehicle } from '../../models/professionalAndVehicle.model';

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
  isRegistrationLoading$: Observable<boolean>;

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
    this.isRegistrationLoading$ =
      this.facade.isProfessionalRegistrationLoading$;

    this.stateCityFacade.getStates();

    this.stateCityFacade.hasStateCityFailed$
      .pipe(untilDestroyed(this))
      .subscribe((fail) =>
        fail
          ? this.toastr.error(
              'Houve um erro enquanto buscávamos as cidades e estados disponíveis. Atualize a página para tentar novamente.'
            )
          : null
      );

    this.facade.registrationStep$
      .pipe(untilDestroyed(this))
      .subscribe((step) => (this.currentStep = step));
    this.facade.hasProfessionalRegistrationSucceed$
      .pipe(untilDestroyed(this))
      .subscribe((success) => {
        if (success) {
          this.toastr.success('Registro finalizado com sucesso!');
          window.location.reload();
        }
      });
    this.facade.hasProfessionalRegistrationFailed$
      .pipe(untilDestroyed(this))
      .subscribe((fail) =>
        fail
          ? this.toastr.error(
              'Houve um problema ao finalizar seu cadastro. Tente novamente mais tarde ou contate o suporte.'
            )
          : null
      );
  }

  finishRegistration(): void {
    const newProfessional: professionalAndVehicle = {
      users_id: this.user.id,
      ...(this.professionalRegistrationForm.value as professionalAndVehicle),
    };

    this.facade.finishProfessionalRegistration(newProfessional);
  }

  getCitiesByState(state: string): void {
    this.stateCityFacade.getCitiesByState(state);
  }
}
