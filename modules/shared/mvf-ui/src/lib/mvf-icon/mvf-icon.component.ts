import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

/**
 * Componente genérico de biblioteca própria para renderizar ícones
 * na aplicação de maneira otimizada.
 * @implements {OnChanges}
 */
@Component({
  selector: 'lib-mvf-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mvf-icon.component.html',
})
export class MvfIconComponent implements OnChanges {
  /**
   * Input que recebe pelo componente pai o ícone a ser renderizado.
   * @see {icons.model.ts}
   */
  @Input() icon?: string;
  /**
   * Input que recebe classes css a serem aplicadas no ícone.
   */
  @Input() classes?: string;

  private el: Element;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.el = elRef.nativeElement as Element;
  }

  /**
   * Quando o input de icon muda, o método roda e renderiza o ícone.
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    const iconName = changes['icon'];

    if (iconName?.currentValue !== iconName?.previousValue && !!this.icon) {
      this.el.innerHTML = this.icon;
    }

    const svg = this.el.firstChild;

    if (!!svg && svg instanceof Element) {
      this.renderer.removeAttribute(svg, 'class');

      let toAddClasses = 'fill-current';
      if (this.classes) {
        toAddClasses += `${this.classes}`;
      }
      this.renderer.setAttribute(svg, 'class', toAddClasses);
    }
  }
}
