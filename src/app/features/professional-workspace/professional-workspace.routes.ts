import { Route } from '@angular/router';
import { ProfessionalWorkspaceRootComponent } from './containers/professional-workspace-root/professional-workspace-root.component';
import { BudgetCalculationComponent } from './containers/budget-calculation/budget-calculation.component';
import { AccountStatusComponent } from './containers/account-status/account-status.component';
import { professionalGuard } from './utils/professional-guard.guard';

export const professionalWorkspaceRoutes: Route[] = [
  {
    path: '',
    component: ProfessionalWorkspaceRootComponent,
    canActivate: [professionalGuard],
    children: [
      // {
      //   path: '',
      //   component: BudgetCalculationComponent,
      // },
      {
        path: '',
        component: AccountStatusComponent,
        // canActivate: [professionalGuard],
      },
    ],
  },
];
