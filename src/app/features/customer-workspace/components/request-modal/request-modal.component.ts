import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'mvf-request-modal',
  templateUrl: './request-modal.component.html',
  styles: [
    `
      :host {
        display: block;
        background: #fff;
        border-radius: 8px;
        padding: 16px;
      }
    `,
  ],
})
export class RequestModalComponent {
  constructor(@Inject(DIALOG_DATA) public data: DialogData) {}
}
