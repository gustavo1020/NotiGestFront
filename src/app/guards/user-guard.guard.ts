import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core'
import { AuthService } from '../services/auth.service';

export const userGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)

  return !authService.isLoggedIn() === false ? router.navigate(["/home"]) : true
};
