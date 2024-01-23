import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {
  private filtrarNoticiasSource = new Subject<any>();
  filtrarNoticias$ = this.filtrarNoticiasSource.asObservable();

  enviarKeywordFiltro(keyword: any): void {
    this.filtrarNoticiasSource.next(keyword);
  }
}
