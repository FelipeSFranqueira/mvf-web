/* eslint-disable @nx/enforce-module-boundaries */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { customerWorkspaceRoutes } from './customer-workspace.routes';
import { CustomerWorkspaceRootComponent } from './containers/customer-workspace-root/customer-workspace-root.component';
import { ProfessionalSearchComponent } from './components/professional-search/professional-search.component';
import { IMaskModule } from 'angular-imask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SearchResultsListComponent } from './containers/search-results-list/search-results-list.component';
import { ProfessionalSearchBarComponent } from './components/professional-search-bar/professional-search-bar.component';
import { ProfessionalCardComponent } from './components/professional-card/professional-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(customerWorkspaceRoutes),
    IMaskModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    CustomerWorkspaceRootComponent,
    ProfessionalSearchComponent,
    SearchResultsListComponent,
    ProfessionalSearchBarComponent,
    ProfessionalCardComponent,
  ],
})
export class CustomerWorkspaceModule {}
