import { FormControl, FormGroup, Validators } from '@angular/forms';

const userData = new FormGroup({
  birthdate: new FormControl('', Validators.required),
  cpf: new FormControl('', [
    Validators.required,
    Validators.minLength(14),
    Validators.maxLength(14),
  ]),
  phoneNumber: new FormControl('', Validators.required),
});

export const professionalForm = new FormGroup({
  userData,
  cnh: new FormControl('', Validators.required),
  hasCnpj: new FormControl(false, Validators.required),
  cnpj: new FormControl(''),
  legalName: new FormControl(''),
});

export const vehicleForm = new FormGroup({
  vehicleType: new FormControl('', Validators.required),
  vehiclePlate: new FormControl('', Validators.required),
  vehicleDocument: new FormControl('', Validators.required),
});
