import { FormControl } from '@angular/forms';

export interface ProfessionalRegistrationForm {
  cpf: FormControl<string>;
  preferredName: FormControl<string>;
  cnhImage: FormControl<File | null>;
  userHoldingCnhImage: FormControl<File | null>;
  cnhNumber: FormControl<string>;
  cnhCategory: FormControl<string>;
  baseValue: FormControl<number>;
  valuePerKm: FormControl<number>;
  supportedState: FormControl<string>;
  supportedCities: FormControl<string[]>;
  vehicleType: FormControl<string>;
  vehicleName: FormControl<string>;
  vehicleImage: FormControl<File | null>;
}
