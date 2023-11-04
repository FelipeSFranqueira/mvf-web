import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfessionalWorkspaceRootComponent } from './containers/professional-workspace-root/professional-workspace-root.component';
import { RouterModule } from '@angular/router';
import { professionalWorkspaceRoutes } from './professional-workspace.routes';
import { BudgetCalculationComponent } from './containers/budget-calculation/budget-calculation.component';
import { AccountStatusComponent } from './containers/account-status/account-status.component';
import { ProfessionalService } from './api/professional.service';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(professionalWorkspaceRoutes)],
  providers: [ProfessionalService],
  declarations: [
    ProfessionalWorkspaceRootComponent,
    BudgetCalculationComponent,
    AccountStatusComponent,
  ],
})
export class ProfessionalWorkspaceModule {}
