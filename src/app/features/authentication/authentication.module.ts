import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authenticationRoutes } from './authentication.routes';
import { LoginComponent } from './containers/login/login.component';
import { MvfIconComponent } from 'modules/shared/mvf-ui';
import { RegistrationComponent } from './containers/registration/registration.component';
import { RegistrationTypeComponent } from './components/registration-type/registration-type.component';
import { ProfessionalRegistrationComponent } from './containers/professional-registration/professional-registration';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authenticationRoutes),
    MvfIconComponent,
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    RegistrationTypeComponent,
    ProfessionalRegistrationComponent,
  ],
})
export class AuthenticationModule {}
