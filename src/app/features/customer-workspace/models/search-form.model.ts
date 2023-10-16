import { FormControl } from '@angular/forms';

export interface SearchForm {
  origin: FormControl<string>;
  destination: FormControl<string>;
}
