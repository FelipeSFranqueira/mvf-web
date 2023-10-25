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
import { CookieService } from 'ngx-cookie-service';

/**
 * Módulo da funcionalidade de Autenticação.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authenticationRoutes),
    MvfIconComponent,
    ReactiveFormsModule,
    MvfControlErrorComponent,
    HttpClientModule,
    MvfLoaderComponent,
    RouterModule,
  ],
  declarations: [LoginComponent, RegistrationComponent],
  providers: [CookieService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthenticationModule {}
