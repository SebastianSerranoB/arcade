import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'home', component: HomeComponent},
    { path: 'about', component: AboutUsComponent},
    { path: '**', component: ErrorComponent},
   
];
