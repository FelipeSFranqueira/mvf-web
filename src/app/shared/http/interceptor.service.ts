import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('jwt');
    const Authorization = `Bearer ${token}`;

    return next.handle(httpRequest.clone({ setHeaders: { Authorization } }));
  }
}
