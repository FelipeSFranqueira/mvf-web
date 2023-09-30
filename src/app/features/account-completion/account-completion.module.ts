import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationTypeComponent } from './components/registration-type/registration-type.component';
import { ProfessionalRegistrationComponent } from './containers/professional-registration/professional-registration';
import { RegistrationProfessionalInfoComponent } from './components/registration-professional-info/registration-professional-info.component';
import { RegistrationProfessionalDocumentsComponent } from './components/registration-professional-documents/registration-professional-documents';
import { RegistrationProfessionalBusinessComponent } from './components/registration-professional-business/registration-professional-business.component';
import { RegistrationProfessionalReviewComponent } from './components/registration-professional-review/registration-professional-review';
import { MvfIconComponent } from 'modules/shared/mvf-ui';
import { accountCompletionRoutes } from './account-completion.routes';
import { AccountCompletionContainerComponent } from './containers/account-completion-container/account-completion-container.component';
import { ProfessionalRegistrationFacade } from './professional-registration.facade';
import { ProfessionalRegistrationState } from './state/professional-registration.state';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MvfIconComponent,
    RouterModule.forChild(accountCompletionRoutes),
  ],
  declarations: [
    AccountCompletionContainerComponent,
    RegistrationTypeComponent,
    ProfessionalRegistrationComponent,
    RegistrationProfessionalInfoComponent,
    RegistrationProfessionalDocumentsComponent,
    RegistrationProfessionalBusinessComponent,
    RegistrationProfessionalReviewComponent,
  ],
  providers: [ProfessionalRegistrationFacade, ProfessionalRegistrationState],
})
export class AccountCompletionModule {}
