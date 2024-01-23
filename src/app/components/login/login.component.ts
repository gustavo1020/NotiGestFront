import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service'
import { JwtService } from '../../services/jwt.service'
import { MessagesModule } from 'primeng/messages';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, FormsModule, PasswordModule, InputTextModule, ReactiveFormsModule, MessagesModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  messages: any[] = [];
  constructor(private authService: AuthService, private jwtService : JwtService, private formBuilder : FormBuilder) {}

  loginForm? : FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      password : ['', [Validators.required ] ]
    })
  }

  onSubmit(){
    const credentials = {email: this.loginForm?.get("email")?.value, password: this.loginForm?.get('password')?.value };
    const resp = this.authService.login(credentials).subscribe(
          (response) => {
    },
      (error) => {
        this.messages = [{ severity: "error", summary: error.error, detail: error.status }];
      }
    );
  }
}
