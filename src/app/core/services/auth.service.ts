import { Injectable, inject } from '@angular/core';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
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
      if (error.message.toLowerCase().includes('already')) {
        this.toast.showError('Ya existe una cuenta con ese correo.');
      } else {
        this.toast.showError('Ocurrio un error al registrar el usuario.');
      }
      return null;
    }
    else{
      this.toast.showSuccess('Usuario registrado con exito! Revisa tu correo para confirmarlo.');
    }

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

  async getUser() : Promise<User | null>{
    const { data } = await this.supabase.auth.getUser();
    return data.user ?? null;
  }

  onAuthStateChange(callback: (session: Session | null) => void){
    return this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.supabase.auth.getSession().then(({ data }) => !!data.session);
  }


  async getSession(){
    const{ data, error } = await this.supabase.auth.getSession();
    if(error) throw error;
    return data.session;
  }

  async resendEmailConfirmation(email: string){
    const{error} = await this.supabase.auth.resend(({ type: 'signup', email}));
    if(error) throw error;
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }



}
