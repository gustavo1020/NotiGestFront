import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Noticias } from '../../interfaces/noticias';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ImageModule } from 'primeng/image';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { JwtService } from '../../services/jwt.service';
import { NoticiaServiceService } from '../../services/noticia-service.service';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import {urlValidator} from '../../validators/urValidators'
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    ProgressSpinnerModule,
    ButtonModule,
    TooltipModule,
    ImageModule,
    ScrollPanelModule,
    DialogModule,
    FormsModule,
    InputTextareaModule,
    MessagesModule,
    CommonModule,
    ReactiveFormsModule,
    InputGroupModule, 
    InputGroupAddonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private jwtService: JwtService,
    private noticiaService: NoticiaServiceService,
    private formBuilder : FormBuilder,
    private communicationService : CommunicationService
  ) {}
  search:boolean = false
  visible: boolean = false;
  noticias: WritableSignal<Noticias[]> = signal([]);
  cargando = signal(false);
  usuario: string = '';
  messages: any[] = [];
  noticiaForm? : FormGroup;

  ngOnInit(): void {
    this.getNoticias({cantItemForPage : 100, pageNumber: 0, nuevos: true, prioridad: false});

    this.communicationService.filtrarNoticias$.subscribe(keyword => {
      this.getNoticias({cantItemForPage : 100, pageNumber: 0, nuevos: keyword.date, prioridad: keyword.destacada, text: keyword.text});
    });
    
    this.usuario = this.jwtService.jwtdecode().username.trim();
    this.noticiaForm = this.formBuilder.group({
      id : '',
      url : ['', [Validators.required, urlValidator()]],
      titulo : ['', [Validators.required] ],
      contenido : ['', [Validators.required]]
    })
  }

  async getNoticias(body: any) {
    try {
      this.cargando = signal(true);
      this.noticiaService.getNoticias(body).subscribe((resp) => {
        this.noticias.set(resp.value.resultado);
      });
      // Handle the responseJson as needed
    } catch (error) {
      console.error('Error fetching noticias:', error);
      // Handle the error appropriately (e.g., show an error message to the user)
    } finally {
      this.cargando = signal(false);
    }
  }

  abrirDialogo(noticia :any) {
    this.noticiaForm?.setValue({
      id : noticia.id,
      url : noticia.enlaceImagen,
      titulo : noticia.titulo,
      contenido : noticia.contenido
    })
    this.visible = true;
  }

  eliminarNoticia(id: string) {
    this.noticiaService.deleteNoticia(id).subscribe(
      (response) => {
        this.messages = [
          { severity: 'success', summary: "Eliminado Correctamente", detail: "Ok" },
        ];
        setTimeout(() => {
          location.reload();
        }, 500);
      },
      (error) => {
        this.messages = [
          { severity: 'error', summary: error.error, detail: error.status },
        ];
      }
    );
  }
  actualizarNoticia(){
    this.noticiaService.actualizarNoticia(this.noticiaForm).subscribe(
      (response) => {
        if(response.value.exitoso){
          this.messages = [
            { severity: 'success', summary: 'Noticia actualizada correctamente' },
          ];
          setTimeout(() => {
            location.reload();
          }, 4000);
        }else{
          this.messages = [
            { severity: 'error', summary: 'Error en la validacion de los campos', detail: response.value?.errores[0]?.errorMessage },
          ];
        }
      },
      (error) => {
        console.log(error);
        this.messages = [
          { severity: 'error', summary: error.error, detail: error.status },
        ];
      }
    );
  }
}
