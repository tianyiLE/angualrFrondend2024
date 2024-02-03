import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  if (authService.isLogged()) {
    return true;
  } else {
    console.log("Vous n'etes pas connecte ! Navigation refusee !");
    router.navigate(['/login']);
    return false;
  }
};
