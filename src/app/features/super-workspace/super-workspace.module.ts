import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { superWorkspaceRoutes } from './super-workspace.routes';
import { SuperWorkspaceRootComponent } from './containers/super-workspace-root/super-workspace-root.component';
import { AccountRequestsComponent } from './containers/account-requests/account-requests.component';
import { RegistrationRequestsService } from './api/registration-requests.service';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(superWorkspaceRoutes)],
  providers: [RegistrationRequestsService],
  declarations: [SuperWorkspaceRootComponent, AccountRequestsComponent],
})
export class SuperWorkspaceModule {}
