import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../interfaces/config/config'

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configUrl = '/assets/config.json';

  config?: AppConfig = {
    apiUrl: 'https://github.com/',
  };

  constructor(private http: HttpClient) {}

  loadConfig(): void {
    this.http.get<AppConfig>(this.configUrl).toPromise()
    .then(data => {
        this.config = data === undefined ? {apiUrl : ""} : data;
    })
  }
}
