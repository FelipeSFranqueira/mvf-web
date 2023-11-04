import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfessionalRegistrationForm } from '../../models/forms.model';

@Component({
  selector: 'mvf-registration-professional-info',
  templateUrl: './registration-professional-info.component.html',
})
export class RegistrationProfessionalInfoComponent {
  @Input()
  professionalRegistrationForm!: FormGroup<ProfessionalRegistrationForm>;
}
