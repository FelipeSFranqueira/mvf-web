import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

/**
 * Componente responsável pela renderização de mensagens de erro
 * seguindo um padrão de design.
 */
@Component({
  selector: 'lib-mvf-control-error',
  templateUrl: './mvf-control-error.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class MvfControlErrorComponent {
  /**
   * Mensagem de erro a ser renderizada.
   */
  @Input() message?: string;
}
