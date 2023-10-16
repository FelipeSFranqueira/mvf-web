import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

/**
 * HTTP Interceptor que injeta o cookie do token de atuenticação
 * em todas as requests.
 */
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  /**
   * Método que intercepta as requests e adiciona o header de autenticação.
   * @param httpRequest
   * @param next
   * @returns {Observable<HttpEvent<any>>} Observable de HttpEvent.
   */
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('jwt');
    const Authorization = `Bearer ${token}`;

    return next.handle(httpRequest.clone({ setHeaders: { Authorization } }));
  }
}
