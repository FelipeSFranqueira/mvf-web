import { Route } from '@angular/router';
import { CustomerWorkspaceRootComponent } from './containers/customer-workspace-root/customer-workspace-root.component';
import { ProfessionalSearchComponent } from './components/professional-search/professional-search.component';
import { SearchResultsListComponent } from './containers/search-results-list/search-results-list.component';

export const customerWorkspaceRoutes: Route[] = [
  {
    path: '',
    component: CustomerWorkspaceRootComponent,
    children: [
      {
        path: '',
        component: ProfessionalSearchComponent,
      },
      {
        path: 'results',
        component: SearchResultsListComponent,
      },
    ],
  },
];
