import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { UserAuth } from '../interfaces/userAuth' 
import { CanActivate, Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { HttpServiceService } from '../services/http-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = "https://localhost:7086/api/v1";

  USER : UserAuth;

  constructor(private http: HttpClient, private router : Router, private cookieService : CookieService, private httpServiceService : HttpServiceService) {  
    this.USER = {email: '', username: '', id:'', roles:'' , login : false};
   }

  login(credentials : any) : Observable<any>  {

    const response = this.httpServiceService.post("/Account/LoginCustom", credentials).pipe(
      tap((response: any) => {
        const token = response.token;
        if (true) {
          const expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 1);
          this.cookieService.set("token", token, expirationDate);
          this.router.navigate(['/home'])
        }
      })
    );
    return response;
  }

  register(credentials : any) : Observable<any>{
    const response = this.httpServiceService.post("/Account/RegisterCustom", credentials);
    return response;
  }

  isLoggedIn() : boolean{
    if(!this.cookieService.check("token")){
      return false
    }
    return true;
  }

  logout(){
    this.cookieService.delete("token");
    this.router.navigate(["/login"])
  }
}
