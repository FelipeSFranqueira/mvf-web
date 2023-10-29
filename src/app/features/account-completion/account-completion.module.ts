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
import { ProfessionalRegistrationState } from './state/professional-registration.state';
import { CustomerRegistrationComponent } from './containers/customer-registration/customer-registration.component';
import { IMaskModule } from 'angular-imask';
import { CustomerRegistrationService } from './api/customer-registration.service';
import { CustomerRegistrationState } from './state/customer-registration.state';
import { CustomerRegsitrationFacade } from './facade/customer-registration.facade';
import { ProfessionalRegistrationFacade } from './facade/professional-registration.facade';
import { ProfessionalRegistrationService } from './api/professional-registration.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MvfIconComponent,
    RouterModule.forChild(accountCompletionRoutes),
    IMaskModule,
  ],
  declarations: [
    AccountCompletionContainerComponent,
    RegistrationTypeComponent,
    ProfessionalRegistrationComponent,
    RegistrationProfessionalInfoComponent,
    RegistrationProfessionalDocumentsComponent,
    RegistrationProfessionalBusinessComponent,
    RegistrationProfessionalReviewComponent,
    CustomerRegistrationComponent,
  ],
  providers: [
    ProfessionalRegistrationFacade,
    ProfessionalRegistrationState,
    ProfessionalRegistrationService,
    CustomerRegistrationService,
    CustomerRegistrationState,
    CustomerRegsitrationFacade,
  ],
})
export class AccountCompletionModule {}
