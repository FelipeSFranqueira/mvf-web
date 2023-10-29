import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProfessionalRegistrationForm } from '../models/forms.model';

export const professionalRegistrationFormGroup =
  new FormGroup<ProfessionalRegistrationForm>({
    cpf: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    preferredName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    cnhImage: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    userHoldingCnhImage: new FormControl(null, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    cnhNumber: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    cnhCategory: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    baseValue: new FormControl(0, {
      validators: [Validators.required, Validators.min(1)],
      nonNullable: true,
    }),
    valuePerKm: new FormControl(0, {
      validators: [Validators.required, Validators.min(0.001)],
      nonNullable: true,
    }),
    supportedState: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    supportedCities: new FormControl([], {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
