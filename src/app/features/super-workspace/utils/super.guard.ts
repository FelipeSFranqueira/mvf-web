import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthenticationFacade } from '../../authentication/authentication.facade';
import { UserRole } from '../../../shared/enums/role.enum';

export const superGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authFacade = inject(AuthenticationFacade);
  const router = inject(Router);

  return authFacade.user$.pipe(
    switchMap((user) => {
      if (!user || user.role !== UserRole.Super) {
        return of(router.createUrlTree(['find-professionals']));
      }

      return of(true);
    })
  );
};
