import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService, Message } from '../../core/services/chat.service';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RealtimeChannel } from '@supabase/supabase-js';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.scss',
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  newMessage: string = '';
  userEmail: string | null = null;

  private channel: RealtimeChannel | null = null;

  constructor(private chatService: ChatService, private auth: AuthService) {}

  async ngOnInit() {
    await this.initializeUser();
    await this.loadMessages();
    this.subscribeToRealtimeMessages();
  }

  ngOnDestroy(): void {
    this.chatService.removeSubscription();
  }

  private async initializeUser() {
    const user = await this.auth.getUser();
    this.userEmail = user?.email ?? null;
  }

  private async loadMessages() {
    this.messages = await this.chatService.fetchMessages();
  }

  private subscribeToRealtimeMessages() {
    this.channel = this.chatService.subscribeToMessages((msg: Message) => {
      this.messages.push(msg);
    });
  }

  async sendMessage() {
    if (!this.newMessage.trim() || !this.userEmail) return;

    const success = await this.chatService.sendMessage(this.newMessage, this.userEmail);
    if (success) this.newMessage = '';
  }
}
