import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { DEFAULT_DIALOG_CONFIG, DialogModule } from '@angular/cdk/dialog';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HeaderInterceptor } from './shared/http/interceptor.service';
import { defineLocale, ptBrLocale } from 'ngx-bootstrap/chronos';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './features/authentication/api/authentication.service';
import { AuthenticationFacade } from './features/authentication/authentication.facade';
import { AuthenticationState } from './features/authentication/state/authentication.state';
import { UserState } from './shared/state/user.state';
registerLocaleData(ptBr);
defineLocale('pt-br', ptBrLocale);

/**
 * Módulo raíz do projeto.
 * Importa, provê e declara componentes e services que são utilizados
 * na aplicação.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DialogModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_DIALOG_CONFIG, useValue: { hasBackdrop: true } },
    CookieService,
    AuthenticationService,
    AuthenticationFacade,
    AuthenticationState,
    UserState,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
