import { Injectable } from '@angular/core';
import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


//interfaz hace las veces de DTO
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

  //Traigo mi instancia de supabase
  constructor( private auth: AuthService) { 
    this.supabase = auth.getClient();
  }


   //Message[] dto, la lista de mensajes
   // {data, error} es una forma de deconstruir un obj en js. 
   //hago la query postrgres. 
   //if error true retorno vacio.
   //data son los message[]
  async fetchMessages(): Promise<Message[]>{
    const{ data, error } = await this.supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true});

    if(error){
      console.error('Error fetching messages:', error.message);
      return [];
    }

    return data as Message[]; //forzamos el tipo de dato xq sabemos lo que retorna. type assertion
  }


  //insertamos el msj en la db
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




  //RealTimeChannel channel es un canal con la DB.
  //.on esta escuchando el evento INSERT en public.messages
  //payload es el mensaje nuevo
  //retorno el channel para que el componente maneje la instancia y termine la subscipcion.
  //Esto es lo importante, recibe una callback function(onNewMessage), cada vez que se inserta un msj en la db se ejecuta.
  //la callback que mando desde el componente, pushea el mensaje a un array de msjs que se muestran en el html.
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




  //Esto creo que corresponde en chatComponent(no aca en el servicio, salvo que mande la instancia). Es para liberar la memoria.
  removeSubscription(): void{
    if(this.channel){
      this.supabase.removeChannel(this.channel);
      this.channel = null;
    }
  }




}
