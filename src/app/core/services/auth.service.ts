import { Injectable, inject } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
  );

  constructor(private router: Router, private toast: ToastService){
  }

  async signUp(email: string, password: string){
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    
    if (error) {
      if (error.message.includes('User already registered')) {
        this.toast.showError('Ya existe una cuenta con ese correo.');
      } else {
        this.toast.showError(error.message || 'Ocurrio un error al registrar el usuario.');
      }
      return;
    }

    this.toast.showSuccess('Usuario registrado con exito! Revisa tu correo para confirmarlo.');
    this.router.navigate(['/home']);

    return data;
  }

  async signIn(email: string, password: string){
    const { data, error} = await this.supabase.auth.signInWithPassword({email, password});
    if(error) throw error;
    return data;
  }

  async signOut(){
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  getUser(){
    return this.supabase.auth.getUser();
  }

  onAuthStateChange(callback: (session: Session | null) => void){
    this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.supabase.auth.getSession().then(({ data }) => !!data.session);
  }






}
