import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

const userData = new UntypedFormGroup({
  firstName: new UntypedFormControl('', Validators.required),
  lastName: new UntypedFormControl('', Validators.required),
  birthdate: new UntypedFormControl('', Validators.required),
  cpf: new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14),
  ]),
  phoneNumber: new UntypedFormControl('', Validators.required),
  email: new UntypedFormControl('', [Validators.required, Validators.email]),
  password: new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]),
  representsCompany: new UntypedFormControl(false),
});

export const userForm = new UntypedFormGroup({
  userData,
  companyData: new UntypedFormGroup({
    legalName: new UntypedFormControl('', Validators.required),
    cnpj: new UntypedFormControl('', Validators.required),
    size: new UntypedFormControl('', Validators.required),
  }),
});

export const professionalForm = new UntypedFormControl({
  userData,
  businessData: new UntypedFormGroup({
    individual: new UntypedFormGroup({
      vehicleType: new UntypedFormControl('', Validators.required), // remember to limit options if the professional is not a company
      vehiclePlate: new UntypedFormControl('', Validators.required),
    }),
    company: new UntypedFormGroup({
      companyData: new UntypedFormGroup({
        legalName: new UntypedFormControl('', Validators.required),
        cnpj: new UntypedFormControl('', Validators.required),
        size: new UntypedFormControl('', Validators.required),
        vehicles: new UntypedFormArray([]),
      }),
    }),
  }),
});
