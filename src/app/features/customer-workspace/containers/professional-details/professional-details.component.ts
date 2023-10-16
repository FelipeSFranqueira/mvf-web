import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { RequestModalComponent } from '../../components/request-modal/request-modal.component';

/**
 * Componente de container dos detalhes de cada prestador de serviço.
 * Mostra os dados do prestador e total estimado para o frete.
 */
@Component({
  selector: 'mvf-professional-details',
  templateUrl: './professional-details.component.html',
})
export class ProfessionalDetailsComponent {
  constructor(private dialog: Dialog) {}

  /**
   * Abre o dialog (modal) utilizando o Angular CDK.
   */
  requestService() {
    this.dialog.open(RequestModalComponent);
  }
}
