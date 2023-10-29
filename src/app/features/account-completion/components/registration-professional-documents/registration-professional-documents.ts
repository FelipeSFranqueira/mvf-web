import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfessionalRegistrationForm } from '../../models/forms.model';

@Component({
  selector: 'mvf-registration-professional-documents',
  templateUrl: './registration-professional-documents.component.html',
})
export class RegistrationProfessionalDocumentsComponent {
  @Input()
  professionalRegistrationForm!: FormGroup<ProfessionalRegistrationForm>;
}
