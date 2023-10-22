import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationFacade } from './features/authentication/authentication.facade';
import { Router } from '@angular/router';

/**
 * Componente root da aplicação.
 * É o ponto de entrada do sistema.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mvf-web';

  constructor(
    private cookieService: CookieService,
    private authFacade: AuthenticationFacade,
    private router: Router
  ) {}

  loginError$ = this.authFacade.loginError$;

  ngOnInit(): void {
    this.loginError$.subscribe((error) =>
      error ? this.router.navigate(['auth', 'login']) : null
    );

    const jwt = this.cookieService.get('jwt');

    this.authFacade.populateUserFromJwt();
  }
}
