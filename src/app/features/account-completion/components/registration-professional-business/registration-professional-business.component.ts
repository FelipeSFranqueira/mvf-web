import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfessionalRegistrationForm } from '../../models/forms.model';
import { City, State } from '../../models/state-city.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'mvf-registration-professional-business',
  templateUrl: './registration-professional-business.component.html',
})
export class RegistrationProfessionalBusinessComponent implements OnInit {
  @Input()
  professionalRegistrationForm!: FormGroup<ProfessionalRegistrationForm>;
  @Input() states: State[];
  @Input() cities: City[];
  @Input() isStateCityLoading: boolean;

  @Output() getCities = new EventEmitter<string>();

  supportedCitiesHelper = new FormControl<string>(null);
  valuePerKmHelper = new FormControl<string>(null);

  ngOnInit(): void {
    this.supportedCitiesHelper.patchValue(
      this.professionalRegistrationForm.controls.supportedCities?.value[0]
    );
    this.valuePerKmHelper.patchValue(
      this.professionalRegistrationForm.controls.valuePerKm.value?.toString()
    );

    this.valuePerKmHelper.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) =>
        this.professionalRegistrationForm.controls.valuePerKm.patchValue(
          Number(value)
        )
      );
    this.supportedCitiesHelper.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) =>
        this.professionalRegistrationForm.controls.supportedCities.patchValue([
          value,
        ])
      );
  }

  onSelect(target: EventTarget) {
    this.getCities.emit((target as HTMLOptionElement).value);
  }
}
