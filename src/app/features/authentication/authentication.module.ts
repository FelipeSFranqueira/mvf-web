import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authenticationRoutes } from './authentication.routes';
import { LoginComponent } from './containers/login/login.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(authenticationRoutes)],
  declarations: [LoginComponent],
})
export class AuthenticationModule {}
