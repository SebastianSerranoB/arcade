import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class GameResultService {
  private supabase: SupabaseClient;


  constructor(private auth: AuthService) { 
    this.supabase = this.auth.getClient();
  }

 
  async saveResult(score: number, gameName: string): Promise<void>{
    const user = await this.auth.getUser();

    const result = {
      score,
      user_email: user?.email || 'guest',
      game_name: gameName,
      created_at: new Date()
    };

    const { error } = await this.supabase.from('game_results').insert([result]);
    if(error) throw error;

  }


}
