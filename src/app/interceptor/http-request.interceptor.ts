import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'
import { CookieService } from 'ngx-cookie-service';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if(authService.isLoggedIn()){
    const cookieService = inject(CookieService);
    const respClone = req.clone({ headers: req.headers.append("Authorization","Bearer " + cookieService.get("token")) })
    return next(respClone);
  }
  return next(req);
};
