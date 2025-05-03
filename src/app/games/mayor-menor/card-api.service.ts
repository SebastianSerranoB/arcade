import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardApiService {
  private baseUrl = 'https://deckofcardsapi.com/api/deck';
  private deckId: string = '';

  constructor(private http: HttpClient) { 
  }

  getNewDeck(): Observable<any>{
    return this.http.get(`${this.baseUrl}/new/shuffle/?deck_count=1`);
  }

  drawCard(): Observable<any>{
    return this.http.get(`${this.baseUrl}/${this.deckId}/draw/?count=1`);
  }

  setDeckId(deckId: string): void{
    this.deckId = deckId;
  }

  getDeckId(): string{
    return this.deckId;
  }



}
