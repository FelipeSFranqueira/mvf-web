import { Component, Input } from '@angular/core';

@Component({
  selector: 'mvf-professional-card',
  templateUrl: './professional-card.component.html',
})
export class ProfessionalCardComponent {
  @Input() professionalName?: string;
  @Input() totalCost?: number;
}
