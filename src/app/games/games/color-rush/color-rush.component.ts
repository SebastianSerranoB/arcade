import { CommonModule } from '@angular/common';
import { Component, signal, effect} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

//import {trigger, state, style, animate, transition} from '@angular/animations'; 

@Component({
  selector: 'app-color-rush',
  imports: [CommonModule, RouterModule],
  templateUrl: './color-rush.component.html',
  styleUrl: './color-rush.component.scss',
  animations: [
    trigger('flash', [
      state(
        'visible',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      transition('* => visible', [
        style({ opacity: 0, transform: 'scale(0.6)' }),
        animate('250ms ease-out'),
      ]),
    ]),
    trigger('scoreChange', [
      transition(':increment', [
        style({ transform: 'translateY(-10px)', opacity: 0 }),
        animate('200ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateY(10px)', opacity: 0 }),
        animate('200ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
    ]),
  ],
})
export class ColorRushComponent {

roundsTotal = 10;
timePerRoundMs = 3000;

  palette = [
  {name: 'Rojo', css: 'red-500'},
  {name: 'Verde', css: 'green-500'},
  {name: 'Azul', css: 'blue-500'},
  {name: 'Amarillo', css: 'yellow-400'},
  {name: 'Cian', css: 'cyan-400'},
  {name: 'Magenta', css: 'fuchsia-500'},
];


round = signal(1);
score = signal(0);
currentWord = signal<{name: string, css: string}>({
  name: '',
  css:'',
});
timerPercent = signal(100);
countdown!: ReturnType<typeof setInterval>;

constructor(){
  this.nextRound();
}

handleYes(): void{
  this.evaluate(this.wordAndColorMatch());
}

handleNo(): void{
  this.evaluate(!this.wordAndColorMatch());
}

evaluate(correct: boolean): void{
  clearInterval(this.countdown);
  this.score.update((s) => s + (correct ? 10 : -5));
  if(this.round() >= this.roundsTotal){
    //toast service score service
    this.restartGame();
  }else{
    this.round.update((r) => r + 1);
    this.nextRound();
  }
}

nextRound(): void{
  const word = this.random(this.palette).name;
  const css = this.random(this.palette).css;
  this.currentWord.set({name: word, css});

  //reseteo barra de progreso
  this.timerPercent.set(100);
  const step = 100 / (this.timePerRoundMs / 100);
  this.countdown = setInterval(() =>{
    this.timerPercent.update((p) => p - step);
    if(this.timerPercent() <= 0){
      clearInterval(this.countdown);
      this.evaluate(false);
    }
  }, 100);
}

restartGame(): void{
  this.round.set(1);
  this.score.set(0);
  this.nextRound();
}


 wordAndColorMatch(): boolean{
  const { name, css} = this.currentWord();
  return(
    (name === 'Rojo' && css.startsWith('red')) ||
    (name === 'Verde' && css.startsWith('green')) ||
    (name === 'Azul' && css.startsWith('blue')) ||
    (name === 'Amarillo' && css.startsWith('yellow')) ||
    (name === 'Cian' && css.startsWith('cyan')) ||
    (name === 'Magenta' && css.startsWith('fuchsia')) 
  );
}

random<T>(arr: T[]): T{
  return arr[Math.floor(Math.random() * arr.length)];
}










}
