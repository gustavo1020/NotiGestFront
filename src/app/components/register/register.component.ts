import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service'
import { CommonModule } from '@angular/common';
import { passwordValidator } from '../../validators/passwordValidator'
import { MessagesModule } from 'primeng/messages';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonModule,CheckboxModule,FormsModule,PasswordModule,InputTextModule, CommonModule, ReactiveFormsModule,MessagesModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit  {
  registerForm? : FormGroup;
  messages: any[] = [];

  constructor(private authService : AuthService, private formBuilder : FormBuilder){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName : ['', [Validators.required, ] ],
      email : ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]],
      password : ['', [Validators.required, passwordValidator()] ]
    })
  }
  onSubmit(){
    const credentials = { userName: this.registerForm?.get('userName')?.value, email: this.registerForm?.get('email')?.value, password: this.registerForm?.get('password')?.value };
    this.authService.register(credentials).subscribe(
      (response) => {
},
  (error) => {
    console.log(error)
    this.messages = [{ severity: "error", summary: error.error, detail: error.status }];
  }
);
  }
}
