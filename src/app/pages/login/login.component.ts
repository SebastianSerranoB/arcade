import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
 email: string = '';
 password: string = '';
 errorMessage: string | null = null;

 constructor(private router: Router, private authService: AuthService){}
  
 async login(){
   try{
      const user = await this.authService.signIn(this.email, this.password);
      if(user){
        this.router.navigate(['/home']);
      }
   }catch(error){
    this.errorMessage = 'Correo o contraseña invalidos.';
    console.error('Login error: ', error);
   }
 }

 fastAccess(){
  this.email = 'lower92469@deusa7.com';
  this.password = '123123';
 }




}
