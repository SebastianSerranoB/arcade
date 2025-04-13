import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';
import { CommonModule } from '@angular/common';
import { User } from '@supabase/supabase-js';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
 userEmail: string | null = null;

  constructor(private auth: AuthService, private router: Router, private toast: ToastService){
  }

  ngOnInit(): void {
    this.checkSessionAndEmailConfirmation();
  }

  async checkSessionAndEmailConfirmation(){
    const user = await this.auth.getUser();
    if(!user){
      this.router.navigate(['/login']);
      return;
    }

    this.checkEmailValidation(user);
  }

  checkEmailValidation(user: User){
    if(!user.email_confirmed_at || user.email_confirmed_at === null){
      this.toast.showAction(
        'Su correo no ha sido verificado. ¿Desea reenviar la confirmacion?', 
        'Reenviar', 
        () => this.resendConfirmation());
    }
  }


  async resendConfirmation(){
    if(!this.userEmail) return;
    try{
      await this.auth.resendEmailConfirmation(this.userEmail);
      this.toast.showSuccess('Correo de verificación enviado!');
    }catch(err){
      this.toast.showError("Hubo un error al enviar el correo de verificacion...");
    }

  }



}
