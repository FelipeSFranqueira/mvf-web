import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { AuthenticationFacade } from '../../authentication/authentication.facade';
import { UserRole } from '../../../shared/enums/role.enum';
import { User } from '../../../shared/models/user.model';
import { ProfessionalService } from '../api/professional.service';
import { Professional } from '../../account-completion/models/professional.model';

export const professionalGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean | UrlTree> => {
  const authFacade = inject(AuthenticationFacade);
  const professionalService = inject(ProfessionalService);
  const router = inject(Router);

  return authFacade.user$.pipe(
    switchMap((user: User) => {
      if (user.role === UserRole.Professional) {
        return professionalService.getProfessionalByUserId(user.id).pipe(
          map((professional: Professional) => {
            route.data = { user, professional };
            return true;
          })
        );
      }

      return of(router.createUrlTree(['auth', 'login']));
    })
  );
};
