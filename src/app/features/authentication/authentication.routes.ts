import { Route } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { RegistrationComponent } from './containers/registration/registration.component';
import { RegistrationTypeComponent } from './components/registration-type/registration-type.component';
import { ProfessionalRegistrationComponent } from './containers/professional-registration/professional-registration';

export const authenticationRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
    children: [
      {
        path: '',
        component: RegistrationTypeComponent,
      },
      {
        path: 'professional',
        component: ProfessionalRegistrationComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
