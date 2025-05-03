import { Component, OnInit } from '@angular/core';
import { CardApiService } from '../card-api.service';

@Component({
  selector: 'app-mayor-menor',
  standalone: false,
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.scss'
})
export class MayorMenorComponent implements OnInit {
  currentCard: any = null;
  lastCardValue: number = 0;
  score = 0;
  lives = 3;

  constructor(private cardService: CardApiService){
  }
  
  ngOnInit(): void {
    this.cardService.getNewDeck().subscribe(res =>{
      this.cardService.setDeckId(res.deck_id);
      this.drawInitialCard();
    });
  }
  
  drawInitialCard(){
    this.cardService.drawCard().subscribe(res =>{
      this.currentCard = res.cards[0];
      this.lastCardValue = this.getCardValue(this.currentCard.value);
    });
  }

  getCardValue(value: string): number{
    const map: any = { 'ACE': 1, 'JACK': 11, 'QUEEN': 12, 'KING': 13};
    return map[value] || +value;
  }

  guess(direction: 'higher' | 'lower'){
    this.cardService.drawCard().subscribe(res => {
      const nextCard = res.cards[0];
      const nextValue = this.getCardValue(nextCard.value);

      const correct = direction === 'higher'
      ? nextValue > this.lastCardValue
      : nextValue < this.lastCardValue;

      if(correct){
        this.score++;
      }else{
        this.lives--;
      }

      this.lastCardValue = nextValue;
      this.currentCard = nextCard;

      if(this.lives === 0){
        alert(`Game over! Your score: ${this.score}`); //toastservice
        this.resetGame();
      }


    });

  }


  resetGame(){
    this.score = 0;
    this.lives = 3;
    this.ngOnInit();
  }



}
