import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfessionalRegistrationForm } from '../../models/forms.model';

@Component({
  selector: 'mvf-registration-professional-review',
  templateUrl: './registration-professional-review.html',
})
export class RegistrationProfessionalReviewComponent {
  @Input()
  professionalRegistrationForm!: FormGroup<ProfessionalRegistrationForm>;
}
