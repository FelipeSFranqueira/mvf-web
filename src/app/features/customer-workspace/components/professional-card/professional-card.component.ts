import { Component, Input } from '@angular/core';

/**
 * Componente de card do profissional.
 */
@Component({
  selector: 'mvf-professional-card',
  templateUrl: './professional-card.component.html',
})
export class ProfessionalCardComponent {
  /**
   * Nome do profissional.
   */
  @Input() professionalName?: string;
  /**
   * Custo total do frete.
   */
  @Input() totalCost?: number;
}
