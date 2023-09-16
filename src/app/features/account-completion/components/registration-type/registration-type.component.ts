import { Component } from '@angular/core';
import { mvfIconTruckSolid, mvfIconUserSolid } from 'modules/shared/mvf-ui';

@Component({
  selector: 'mvf-registration-type',
  templateUrl: './registration-type.component.html',
})
export class RegistrationTypeComponent {
  readonly providerIcon = mvfIconTruckSolid.data;
  readonly userIcon = mvfIconUserSolid.data;
}
