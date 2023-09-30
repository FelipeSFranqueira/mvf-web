import { Route } from '@angular/router';
import { AccountCompletionContainerComponent } from './containers/account-completion-container/account-completion-container.component';
import { RegistrationTypeComponent } from './components/registration-type/registration-type.component';
import { ProfessionalRegistrationComponent } from './containers/professional-registration/professional-registration';

export const accountCompletionRoutes: Route[] = [
  {
    path: '',
    component: AccountCompletionContainerComponent,
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
];
