import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authenticationRoutes } from './authentication.routes';
import { LoginComponent } from './containers/login/login.component';
import { MvfIconComponent } from 'modules/shared/mvf-ui';
import { RegistrationComponent } from './containers/registration/registration.component';
import { RegistrationTypeComponent } from './components/registration-type/registration-type.component';
import { ProfessionalRegistrationComponent } from './containers/professional-registration/professional-registration';
import { RegistrationUserInfoComponent } from './components/registration-user-info/registration-user-info.component';
import { RegistrationUserDocumentsComponent } from './components/registration-user-documents/registration-user-documents';
import { ProfessionalRegistrationState } from './state/professional-registration.state';
import { ProfessionalRegistrationFacade } from './professional-registration.facade';
import { RegistrationUserBusinessComponent } from './components/registration-user-business/registration-user-business.component';
import { RegistrationProfessionalReviewComponent } from './components/registration-professional-review/registration-professional-review';

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
    RegistrationUserInfoComponent,
    RegistrationUserDocumentsComponent,
    RegistrationUserBusinessComponent,
    RegistrationProfessionalReviewComponent,
  ],
})
export class AuthenticationModule {}
