import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfessionalRegistrationForm } from '../../models/forms.model';

@Component({
  selector: 'mvf-registration-professional-business',
  templateUrl: './registration-professional-business.component.html',
})
export class RegistrationProfessionalBusinessComponent {
  @Input()
  professionalRegistrationForm!: FormGroup<ProfessionalRegistrationForm>;
}
