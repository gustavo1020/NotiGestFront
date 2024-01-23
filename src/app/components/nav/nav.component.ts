import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { JwtService } from '../../services/jwt.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NoticiaServiceService } from '../../services/noticia-service.service';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import {urlValidator} from '../../validators/urValidators'
import { CommunicationService } from '../../services/communication.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ AvatarModule,
    AvatarGroupModule,
    BreadcrumbModule,
    ToolbarModule,
    ButtonModule, 
    RouterOutlet, DialogModule, FormsModule, InputTextareaModule,MessagesModule, CommonModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InplaceModule,
    InputMaskModule, InputSwitchModule, InputTextModule, InputNumberModule, RadioButtonModule, CheckboxModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  constructor(private authService : AuthService, private jwtService : JwtService, private noticiaService : NoticiaServiceService, private formBuilder : FormBuilder, private communicationService: CommunicationService){}

  filter = { text : "", date: true, destacada: false, visible: false}
  messages: any[] = [];
  visible = false; 
  noticiaForm? : FormGroup;
  ngOnInit(): void {
    const userAth = this.jwtService.jwtdecode();
    this.user = userAth.username;

    this.noticiaForm = this.formBuilder.group({
      url : ['', [Validators.required, urlValidator()]],
      titulo : ['', [Validators.required] ],
      contenido : ['', [Validators.required]]
    })
    this.filter = { text : "", date: false, destacada: false, visible: false}

  }
  user : string = "";
  usuarioAutenticado(): boolean {
    const estadoLogin = this.authService.isLoggedIn();
    return estadoLogin;
   }

   openCreateNoticia(){
    this.visible = true
   }

   out(){
    this.authService.logout();
   }

   crearNoticia() {
    this.noticiaService.agregarNoticia(this.noticiaForm).subscribe(
      (response) => {
        console.log(response)
        if(response.value.exitoso){
          this.messages = [
            { severity: 'success', summary: 'Noticia generada correctamente' },
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

  mostrarFiltro(){
    this.filter.visible = !this.filter.visible;
  }

  filtrarNoticias(): void {
    this.communicationService.enviarKeywordFiltro(this.filter);
  }
}
