/* eslint-disable @nx/enforce-module-boundaries */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { customerWorkspaceRoutes } from './customer-workspace.routes';
import { CustomerWorkspaceRootComponent } from './containers/customer-workspace-root/customer-workspace-root.component';
import { ProfessionalSearchComponent } from './containers/professional-search/professional-search.component';
import { IMaskModule } from 'angular-imask';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SearchResultsListComponent } from './containers/search-results-list/search-results-list.component';
import { ProfessionalSearchBarComponent } from './components/professional-search-bar/professional-search-bar.component';
import { ProfessionalCardComponent } from './components/professional-card/professional-card.component';
import { ProfessionalDetailsComponent } from './containers/professional-details/professional-details.component';
import { RequestModalComponent } from './components/request-modal/request-modal.component';
import { UserRequestsComponent } from './containers/user-requests/user-requests.component';
import { FindProfessionalsService } from './api/find-professionals.service';
import { FindProfessionalsState } from './state/find-professionals.state';
import { FindProfessionalsFacade } from './facade/find-professionals.facade';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MvfLoaderComponent } from 'modules/shared/mvf-ui';
import { FindSpecificProfessionalService } from './api/find-specific-professional.service';
import { FindSpecificProfessionalState } from './state/find-specific-professional.state';
import { FindSpecificProfessionalFacade } from './facade/find-specific-professional.facade';
import { RequestsService } from './api/requests.service';
import { RequestsState } from './state/requests.state';
import { RequestsFacade } from './facade/requests.facade';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { UserState } from '../global/state/user.state';

/**
 * Módulo da funconalidade de CustomerWorkspace.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(customerWorkspaceRoutes),
    IMaskModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    MvfLoaderComponent,
    TimepickerModule.forRoot(),
  ],
  declarations: [
    CustomerWorkspaceRootComponent,
    SearchResultsListComponent,
    ProfessionalDetailsComponent,
    ProfessionalSearchComponent,
    ProfessionalSearchBarComponent,
    ProfessionalCardComponent,
    RequestModalComponent,
    UserRequestsComponent,
  ],
  providers: [
    FindProfessionalsService,
    FindProfessionalsState,
    FindProfessionalsFacade,
    FindSpecificProfessionalService,
    FindSpecificProfessionalState,
    FindSpecificProfessionalFacade,
    RequestsService,
    RequestsState,
    RequestsFacade,
  ],
})
export class CustomerWorkspaceModule {}
