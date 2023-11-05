import { Route } from '@angular/router';
import { SuperWorkspaceRootComponent } from './containers/super-workspace-root/super-workspace-root.component';
import { AccountRequestsComponent } from './containers/account-requests/account-requests.component';
import { superGuard } from './utils/super.guard';

export const superWorkspaceRoutes: Route[] = [
  {
    path: '',
    component: SuperWorkspaceRootComponent,
    canActivate: [superGuard],
    children: [
      {
        path: '',
        component: AccountRequestsComponent,
      },
    ],
  },
];
