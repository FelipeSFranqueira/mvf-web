import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { authenticationRoutes } from './authentication.routes';
import { LoginComponent } from './containers/login/login.component';
import {
  MvfControlErrorComponent,
  MvfIconComponent,
  MvfLoaderComponent,
} from 'modules/shared/mvf-ui';
import { RegistrationComponent } from './containers/registration/registration.component';
import { AuthenticationFacade } from './authentication.facade';
import { AuthenticationService } from './api/authentication.service';
import { AuthenticationState } from './state/authentication.state';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authenticationRoutes),
    MvfIconComponent,
    ReactiveFormsModule,
    MvfControlErrorComponent,
    HttpClientModule,
    MvfLoaderComponent,
  ],
  declarations: [LoginComponent, RegistrationComponent],
  providers: [AuthenticationFacade, AuthenticationService, AuthenticationState],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthenticationModule {}
