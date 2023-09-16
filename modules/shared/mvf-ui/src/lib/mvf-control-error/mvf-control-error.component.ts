import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-mvf-control-error',
  templateUrl: './mvf-control-error.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class MvfControlErrorComponent {
  @Input() message?: string;
}
