import { FormControl } from '@angular/forms';

export interface ProfessionalRegistrationForm {
  cpf: FormControl<string>;
  preferredName: FormControl<string>;
  phoneNumber: FormControl<string>;
  cnhNumber: FormControl<string>;
  cnhCategory: FormControl<string>;
  baseValue: FormControl<number>;
  valuePerKm: FormControl<number>;
  supportedState: FormControl<string>;
  supportedCities: FormControl<string[]>;
  vehicleType: FormControl<string>;
  vehicleName: FormControl<string>;
}
