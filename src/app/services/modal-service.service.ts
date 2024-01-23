import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  constructor(private dialogService: DialogService) {}

  openDataModel(data: any): void {
    const ref = this.dialogService.open(ModalComponent, {
      data: data,
      header: 'Actualizar Noticia',
      width: '50vw',
      height: '500px'
    });
  }
}