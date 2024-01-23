import { Injectable } from '@angular/core';
import { UserAuth } from '../interfaces/userAuth'
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  userData : UserAuth = {login : false, email: "", id: "", username: "", roles: ""}
  constructor(private cookieService : CookieService) { }

  validartoken() : UserAuth{
    const userToken: UserAuth =this.jwtdecode();;
    return userToken;
  }

  jwtdecode() : UserAuth{
    const token = this.cookieService.get("token");
    if(token == "") return this.userData
     const [header, payload, signature] = token.split('.');
     const decodedHeader = JSON.parse(this.base64UrlDecode(header));
     const decodedPayload = JSON.parse(this.base64UrlDecode(payload));
     this.userData.login = true; this.userData.email = decodedPayload.email; this.userData.id = decodedPayload.id; this.userData.username = decodedPayload.unique_name; this.userData.roles = decodedPayload.role;
     return this.userData;
  }

  base64UrlDecode(base64Url: string): string {

    while (base64Url.length % 4) {
      base64Url += '=';
    }
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  
    const decoded = atob(base64);
  
    return decoded;
  }
}
