import { Injectable, inject } from '@angular/core';
import { StateCityState } from '../state/state-city.state';
import { StateCityService } from '../api/state-city.service';
import { first } from 'rxjs';

@Injectable()
export class StateCityFacade {
  stateCityState = inject(StateCityState);
  stateCityService = inject(StateCityService);

  states$ = this.stateCityState.states$;
  cities$ = this.stateCityState.cities$;

  isStateCityLoading$ = this.stateCityState.isStateCityLoading$;
  hasStateCitySucceed$ = this.stateCityState.hasStateCitySucceed$;
  hasStateCityFailed$ = this.stateCityState.hasStateCityFailed$;

  getStates(): void {
    this.stateCityState.getStateOrCity();
    this.stateCityService
      .getStates()
      .pipe(first())
      .subscribe({
        next: (states) => this.stateCityState.stateSuccess(states),
        error: () => this.stateCityState.stateFail(),
      });
  }

  getCitiesByState(state: string): void {
    this.stateCityState.getStateOrCity();
    this.stateCityService
      .getCitiesByState(state)
      .pipe(first())
      .subscribe({
        next: (cities) => this.stateCityState.citySuccess(cities),
        error: () => this.stateCityState.cityFail(),
      });
  }
}
