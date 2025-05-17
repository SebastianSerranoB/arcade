import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { authGuard } from './core/guards/auth.guard';
import { SurveyComponent } from './pages/survey/survey.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'home', canActivate:[authGuard], component: HomeComponent},
    { path: 'survey', canActivate:[authGuard], component: SurveyComponent},
    {  
        path: 'about', 
        canActivate:[authGuard], 
        loadComponent: () => import('./pages/about-us/about-us.component').then(m => m.AboutUsComponent)},
    { 
        path: 'chat-room',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/chat-room/chat-room.component').then(m => m.ChatRoomComponent)
    },
    {
        path: 'games',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./games/games/games.module')
            .then(m => m.GamesModule)
    },   
    { path: '**', component: ErrorComponent},
   
];
