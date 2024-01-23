import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private URL = "https://localhost:7086/api/v1";

  constructor(private http: HttpClient) { }

  post(path : string ,body : any, headers? : {}) : Observable<any>{
    return this.http.post( this.URL + path , body, headers );
  }

  put(path : string ,body : any, headers? : {}): Observable<any>{
    return this.http.put( this.URL + path , body, headers );
  }
  delete(path : string ,body? : any, headers? : {}): Observable<any>{
    return this.http.delete( this.URL + path , body );
  }
  get(path : string ,body? : any, headers? : {}): Observable<any>{
    return this.http.get( this.URL + path , body );
  }
}
