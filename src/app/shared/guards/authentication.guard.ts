import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserState } from '../../features/global/state/user.state';
import { catchError, map, of, switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../features/authentication/api/authentication.service';

export const authenticationGuard: CanActivateFn = () => {
  const userState = inject(UserState);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const authService = inject(AuthenticationService);

  return userState.user$.pipe(
    switchMap((user) => {
      const jwt = cookieService.get('jwt');
      if (!user) {
        return authService.populateUser().pipe(
          map((user) => {
            userState.setUser(user);
            return true;
          }),
          catchError(() => router.navigate(['auth', 'login']))
        );
      }

      if (!jwt || jwt.length < 10) {
        return of(router.createUrlTree(['auth', 'login']));
      }

      return of(true);
    })
  );
};
