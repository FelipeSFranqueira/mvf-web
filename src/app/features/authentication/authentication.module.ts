import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authenticationRoutes } from './authentication.routes';
import { LoginComponent } from './containers/login/login.component';
import { MvfIconComponent } from 'modules/shared/mvf-ui';
import { RegistrationComponent } from './containers/registration/registration.component';
import { RegistrationTypeComponent } from './components/registration-type/registration-type.component';
import { ProfessionalRegistrationComponent } from './containers/professional-registration/professional-registration';
import { RegistrationProfessionalInfoComponent } from './components/registration-professional-info/registration-professional-info.component';
import { RegistrationProfessionalDocumentsComponent } from './components/registration-professional-documents/registration-professional-documents';
import { ProfessionalRegistrationState } from './state/professional-registration.state';
import { ProfessionalRegistrationFacade } from './professional-registration.facade';
import { RegistrationProfessionalBusinessComponent } from './components/registration-professional-business/registration-professional-business.component';
import { RegistrationProfessionalReviewComponent } from './components/registration-professional-review/registration-professional-review';
import { RegistrationAccountComponent } from './components/registration-account/registration-account.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authenticationRoutes),
    MvfIconComponent,
  ],
  providers: [ProfessionalRegistrationState, ProfessionalRegistrationFacade],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    RegistrationTypeComponent,
    ProfessionalRegistrationComponent,
    RegistrationProfessionalInfoComponent,
    RegistrationProfessionalDocumentsComponent,
    RegistrationProfessionalBusinessComponent,
    RegistrationProfessionalReviewComponent,
    RegistrationAccountComponent,
  ],
})
export class AuthenticationModule {}
