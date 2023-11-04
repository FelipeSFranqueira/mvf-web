import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthenticationFacade } from '../../authentication/authentication.facade';
import { User } from '../../../shared/models/user.model';
import { UserRole } from '../../../shared/enums/role.enum';

export const accountCompletionGuard: CanActivateFn = (): Observable<
  boolean | UrlTree
> => {
  const authFacade = inject(AuthenticationFacade);
  const router = inject(Router);

  return authFacade.user$.pipe(
    switchMap((user: User) => {
      if (user.isFirstAccess || user.role === UserRole.User) {
        return of(true);
      }

      return of(
        router.createUrlTree(
          user.role === UserRole.Professional
            ? ['professional-workspace']
            : ['find-professionals']
        )
      );
    })
  );
};
