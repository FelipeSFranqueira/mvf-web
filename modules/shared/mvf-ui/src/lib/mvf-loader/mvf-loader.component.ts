import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * Componente de loader. Deve ser mostrado quando um dado está
 * sendo carregado.
 */
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
