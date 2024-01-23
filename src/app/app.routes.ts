import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from '../app/guards/auth.guard'
import { userGuardGuard } from '../app/guards/user-guard.guard'
import { SearchComponent } from './components/search/search.component';


export const routes: Routes = [
    {path: "login", component: LoginComponent, canActivate: [userGuardGuard]},
    {path: "register", component: RegisterComponent, canActivate: [userGuardGuard] },
    {path: "home", component:HomeComponent, canActivate: [authGuard]},
    {path: "usuarios", component: SearchComponent, canActivate : [authGuard]},
    {path: "**", redirectTo: "home", pathMatch: "full"}
];
