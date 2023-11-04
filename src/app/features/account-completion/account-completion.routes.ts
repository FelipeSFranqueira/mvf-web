import { Route } from '@angular/router';
import { AccountCompletionContainerComponent } from './containers/account-completion-container/account-completion-container.component';
import { RegistrationTypeComponent } from './components/registration-type/registration-type.component';
import { ProfessionalRegistrationComponent } from './containers/professional-registration/professional-registration';
import { CustomerRegistrationComponent } from './containers/customer-registration/customer-registration.component';
import { accountCompletionGuard } from './utils/account-completion.guard';

export const accountCompletionRoutes: Route[] = [
  {
    path: '',
    component: AccountCompletionContainerComponent,
    canActivate: [accountCompletionGuard],
    children: [
      {
        path: '',
        component: RegistrationTypeComponent,
      },
      {
        path: 'professional',
        component: ProfessionalRegistrationComponent,
        canActivate: [accountCompletionGuard],
      },
      {
        path: 'customer',
        component: CustomerRegistrationComponent,
        canActivate: [accountCompletionGuard],
      },
    ],
  },
];
