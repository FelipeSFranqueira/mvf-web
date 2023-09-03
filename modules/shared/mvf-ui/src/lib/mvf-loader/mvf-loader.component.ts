import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-mvf-loader',
  template: `<div class="lds-ripple">
    <div></div>
    <div></div>
  </div>`,
  styleUrls: ['./mvf-loader.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MvfLoaderComponent {}
