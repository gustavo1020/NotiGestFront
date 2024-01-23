import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpService : HttpServiceService) { }


  getUsuarios(): Observable<any>{
    return this.httpService.get("/Account/GetAllUsers/getall")
  }

}
