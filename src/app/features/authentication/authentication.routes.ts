import { Route } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { RegistrationComponent } from './containers/registration/registration.component';

/**
 * Constante de array de rotas da funcionalidade de autenticação.
 * @type {Route[]}
 */
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
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
