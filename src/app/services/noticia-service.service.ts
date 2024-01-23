import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class NoticiaServiceService {

  constructor(private httpService : HttpServiceService, private jwtService : JwtService) { }


  getNoticias(body? : any, headers? : {}): Observable<any>{
    const options = {
      params: body,
      headers: headers
    };
    return this.httpService.get("/Noticia/GetAll", options)
  }
  
  deleteNoticia(id: string): Observable<any>{
    return this.httpService.delete("/Noticia/Delete/" + id)
  }

  actualizarNoticia(body : any, headers? : {}): Observable<any>{
    const noticia = { titulo : body?.get("titulo")?.value, contenido: body?.get("contenido")?.value, destacada : false, enlaceImagen : body?.get("url")?.value};
    return this.httpService.put("/Noticia/Update/" + body?.get("id")?.value, noticia, headers)
  }

  agregarNoticia(body : any, headers? : {}): Observable<any>{
    const user = this.jwtService.jwtdecode().id;
    const noticia = { usuario : user , titulo : body?.get("titulo")?.value, contenido: body?.get("contenido")?.value, destacada : false, enlaceImagen : body?.get("url")?.value};
    return this.httpService.post("/Noticia/Create", noticia, headers);
  }
}
