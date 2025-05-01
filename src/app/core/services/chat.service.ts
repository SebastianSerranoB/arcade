import { Injectable } from '@angular/core';
import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Message{
  id: string;
  content: string;
  user_email: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private supabase: SupabaseClient;
  private channel: RealtimeChannel | null = null;

  constructor() { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  async fetchMessages(): Promise<Message[]>{
    const{ data, error } = await this.supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true});

    if(error){
      console.error('Error fetching messages:', error.message);
      return [];
    }

    return data as Message[];
  }

  async sendMessage(content: string, userEmail: string): Promise<boolean>{
    const { error } = await this.supabase.from('messages').insert([
      {
        content: content.trim(),
        user_email: userEmail,
      },
    ]);

    if(error){
      console.error('Error sending message;', error.message);
      return false;
    }

    return true;
  }


  subscribeToMessages(onNewMessage: (msg: Message) => void): RealtimeChannel{
    this.channel = this.supabase.channel('messages-channel')
    .on('postgres_changes',{
      event: 'INSERT',
      schema: 'public',
      table: 'messages'
    }, (payload) =>{
      const newMessage = payload.new as Message;
      onNewMessage(newMessage);
    }).subscribe((status) =>{
      console.log('Realtime subscription status:', status);
    });

    return this.channel;
  }



  removeSubscription(): void{
    if(this.channel){
      this.supabase.removeChannel(this.channel);
      this.channel = null;
    }
  }




}
