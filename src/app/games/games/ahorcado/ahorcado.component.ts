import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent implements OnInit{
  hiddenWord = '';
  selectedLetters: string[] = [];
  maxAttempts = 6;

  words: string[] = [
  'PROGRAMAR', 'ANGULAR', 'DESARROLLO', 'NEÓN', 'AHORCADO', 'JUEGO', 'CÓDIGO', 'TIPOGRAFÍA',
  'SOFTWARE', 'TECLADO', 'PANTALLA', 'VARIABLE', 'FUNCION', 'COMPONENTE', 'SERVICIO', 'RUTA',
  'MODULO', 'ARCADE', 'BOTÓN', 'ESTILO', 'HTML', 'CSS', 'TIPO', 'ANGULO', 'FLECHA', 'JAVASCRIPT',
  'TIPADO', 'OBJETO', 'INTERFAZ', 'ANIMACIÓN'
];


  ngOnInit(): void {
   this.selectRandomHiddenWord();
  }

  selectRandomHiddenWord(): void{
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.hiddenWord = this.words[randomIndex];
    console.log('The hidden word is: ' + this.hiddenWord); 
  }

  get failedAttempts(): number{
    return this.selectedLetters.filter(l => !this.hiddenWord.includes(l)).length;
  }

  get currentImage(): string{
    return `assets/ahorcado/ahorcado${this.failedAttempts}.png`;
  }

  get letters(): string[]{
    return 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  }

  selectLetter(letter: string){
    if(!this.selectedLetters.includes(letter)){
      this.selectedLetters.push(letter);
    }
  }

  shownLetter(letter: string): string{
    return this.selectedLetters.includes(letter) ? letter : '_';
  }

  gameLost(): boolean{
    return this.failedAttempts >= this.maxAttempts;
  }

  gameWon(): boolean{
    return this.hiddenWord.split('').every(l => this.selectedLetters.includes(l));
  }

  restartGame(){
    this.selectedLetters = [];
    this.selectRandomHiddenWord();
   
  }

  //NEXT: SAVE SCORE SERVICE,  ADD TOAST SERVICE
  //DISPLAY 1 OR 2 LETTERS OF THE HIDDEN WORD SO THE USER CAN GUESS.












}
