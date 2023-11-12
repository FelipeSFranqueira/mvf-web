import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'lib-mvf-header',
  templateUrl: './mvf-header.component.html',
  styles: [
    `
      div {
        position: sticky;
        top: 0;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export class MvfHeaderComponent {
  private cookieService = inject(CookieService);

  logout(): void {
    this.cookieService.delete('jwt');
    window.open('/auth/login', '_self');
  }
}
