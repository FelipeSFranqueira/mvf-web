import { Route } from '@angular/router';

export const appRoutes: Route[] = [
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
  },
];
