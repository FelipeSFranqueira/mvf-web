import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegistrationTypeComponent } from './components/registration-type/registration-type.component';
import { ProfessionalRegistrationComponent } from './containers/professional-registration/professional-registration';
import { RegistrationProfessionalInfoComponent } from './components/registration-professional-info/registration-professional-info.component';
import { RegistrationProfessionalDocumentsComponent } from './components/registration-professional-documents/registration-professional-documents';
import { RegistrationProfessionalBusinessComponent } from './components/registration-professional-business/registration-professional-business.component';
import { RegistrationProfessionalReviewComponent } from './components/registration-professional-review/registration-professional-review';
import { RegistrationAccountComponent } from './components/registration-account/registration-account.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    RegistrationTypeComponent,
    ProfessionalRegistrationComponent,
    RegistrationProfessionalInfoComponent,
    RegistrationProfessionalDocumentsComponent,
    RegistrationProfessionalBusinessComponent,
    RegistrationProfessionalReviewComponent,
    RegistrationAccountComponent,
  ],
})
export class AccountCompletionModule {}
