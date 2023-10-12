import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { RequestModalComponent } from '../../components/request-modal/request-modal.component';

@Component({
  selector: 'mvf-professional-details',
  templateUrl: './professional-details.component.html',
})
export class ProfessionalDetailsComponent {
  constructor(private dialog: Dialog) {}

  requestService() {
    this.dialog.open(RequestModalComponent);
  }
}
