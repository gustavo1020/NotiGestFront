import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Usuarios } from '../../interfaces/usuarios';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DataViewModule, CommonModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent implements OnInit {
  constructor(private usuarioService: UsuarioService){

  }
  users: Usuarios[] = [];
  cargando = signal(false);
  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((resp) => {
      console.log(resp)
      this.users = this.users.concat(resp);
    });
  }
}

