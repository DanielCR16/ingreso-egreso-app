import { inject } from '@angular/core';
import { CanActivateFn ,Router} from '@angular/router';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const oauthService = inject(AuthService);
  const routeService = inject(Router);
  oauthService.isAuth().pipe(
    tap(estado=>estado?"":routeService.navigate(['/login']))
  ).subscribe(data=>console.log("",data));

  return oauthService.isAuth()

};
