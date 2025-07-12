import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: any = inject(AuthenticationService);
  const router: any = inject(Router);

  const data = JSON.parse(localStorage.getItem('logintoken')!);
  if (data == null) {
    router.navigateByUrl('/');
    return false;
  }
  if (data != null && data.role == route.data['expectedRole']) {
    return true;
  } else {
    if (
      data != null &&
      route.data['expectedRole'] == 'USER' &&
      data.role != ''
      ) {
      return true;
    } else {
      router.navigateByUrl('/login');
      return false;
    }
  }
};
