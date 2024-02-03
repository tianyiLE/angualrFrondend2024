import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService)
  let router = inject(Router)

  if (authService.isAdmin()) {
    console.log("Vous etre admin, navigation autorisee !");
    return true;
  } else {
    console.log("Vous n'etes pas admin ! Navigation refusee !");
    router.navigate(['/home']); // 或者其他你希望未授权用户被重定向的地方
    return false;
  }
  // return authService.isAdmin().then(authentifie => {
  //   if (authentifie) {
  //     console.log("Vous etre admin, navigation autorisee !")
  //     return true
  //   } else {
  //     console.log("Vous n'etes pas admin ! Navigation refusee !");
  //     return false
  //   }
  // })
}; 
