import { Route } from '@angular/router';
import { authenticationGuard } from './shared/guards/authentication.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'account-completion',
    loadChildren: () =>
      import('./features/account-completion/account-completion.module').then(
        (m) => m.AccountCompletionModule
      ),
    canActivate: [authenticationGuard],
  },
  {
    path: 'find-professionals',
    loadChildren: () =>
      import('./features/customer-workspace/customer-workspace.module').then(
        (m) => m.CustomerWorkspaceModule
      ),
    canActivate: [authenticationGuard],
  },
  {
    path: 'professional-workspace',
    loadChildren: () =>
      import(
        './features/professional-workspace/professional-workspace.module'
      ).then((m) => m.ProfessionalWorkspaceModule),
    canActivate: [authenticationGuard],
  },
  {
    path: 'super-panel',
    loadChildren: () =>
      import('./features/super-workspace/super-workspace.module').then(
        (m) => m.SuperWorkspaceModule
      ),
    canActivate: [authenticationGuard],
  },
];
