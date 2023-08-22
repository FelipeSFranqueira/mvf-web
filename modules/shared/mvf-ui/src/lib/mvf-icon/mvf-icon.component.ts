import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'lib-mvf-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mvf-icon.component.html',
})
export class MvfIconComponent implements OnChanges {
  @Input() icon?: string;
  @Input() classes?: string;

  private el: Element;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    this.el = elRef.nativeElement as Element;
  }

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
