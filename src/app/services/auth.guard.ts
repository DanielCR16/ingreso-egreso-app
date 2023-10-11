import { inject } from '@angular/core';
import { CanActivateFn ,CanLoadFn,Router} from '@angular/router';
import { AuthService } from './auth.service';
import { take, tap } from 'rxjs/operators';

export const authGuard: CanLoadFn  = (route, state) => {
  const oauthService = inject(AuthService);
  const routeService = inject(Router);
  oauthService.isAuth().pipe(
    tap(estado=>estado?"":routeService.navigate(['/login'])),
    take(1)
  ).subscribe(data=>console.log("",data));

  return oauthService.isAuth()

};
