import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GameResultService } from '../../../core/services/game-result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  imports: [CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent implements OnInit{
  hiddenWord = '';
  selectedLetters: string[] = [];
  maxAttempts = 5;
  currentScore = 0;
  scorePerWord = 10;
  wordsGuessed = 0;

  words: string[] = [
  'PROGRAMAR', 'ANGULAR', 'DESARROLLO', 'NEON', 'AHORCADO', 'JUEGO', 'CODIGO', 'TIPOGRAFIA',
  'SOFTWARE', 'TECLADO', 'PANTALLA', 'VARIABLE', 'FUNCION', 'COMPONENTE', 'SERVICIO', 'RUTA',
  'MODULO', 'ARCADE', 'BOTON', 'ESTILO', 'HTML', 'CSS', 'TIPO', 'ANGULO', 'FLECHA', 'JAVASCRIPT',
  'TIPADO', 'OBJETO', 'INTERFAZ', 'ANIMACION'
];


  constructor(private gameResultService: GameResultService, private router: Router){}


  ngOnInit(): void {
   this.selectRandomHiddenWord();
  }

  ngOnDestroy(): void {
      if(this.currentScore > 0){
        this.gameResultService.saveResult(this.currentScore, 'Ahorcado');
      }
  }


  get failedAttempts(): number{
    return this.selectedLetters.filter(l => !this.hiddenWord.includes(l)).length;
  }

  get currentImage(): string{
    return `/assets/ahorcado/ahorcado${this.failedAttempts}.png`;
  }

  get letters(): string[]{
    return 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  }

  selectLetter(letter: string){
    if(!this.selectedLetters.includes(letter)){
      this.selectedLetters.push(letter);

      if (this.gameWon()) {
        this.updateScore();
        this.showGameWonToast();
      }else{
        if(this.gameLost()){
          this.showGameLostToast();
        }
      }

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

   resetGame() {
    this.currentScore = 0;
    this.wordsGuessed = 0;
    this.restartGame();
  }

  updateScore(): void {
    this.currentScore += this.scorePerWord;
    this.wordsGuessed++;
  }




  selectRandomHiddenWord(): void {
  const randomIndex = Math.floor(Math.random() * this.words.length);
  this.hiddenWord = this.words[randomIndex];
  this.selectedLetters = [];

  const uniqueLetters = Array.from(new Set(this.hiddenWord.split(''))); // evitar letras repetidas
  let lettersToReveal = 0;

  if (this.hiddenWord.length > 10) {
    lettersToReveal = 3;
  } else if (this.hiddenWord.length > 6) {
    lettersToReveal = 2;
  } else if (this.hiddenWord.length > 3) {
    lettersToReveal = 1;
  }

  while (this.selectedLetters.length < lettersToReveal && uniqueLetters.length > 0) {
    const random = Math.floor(Math.random() * uniqueLetters.length);
    const letter = uniqueLetters.splice(random, 1)[0];
    this.selectedLetters.push(letter);
  }

  console.log('The hidden word is: ' + this.hiddenWord); // testing
  console.log('Revealed letters: ' + this.selectedLetters.join(', '));
}



  showGameWonToast(): void {
    Swal.fire({
      title: '¡Palabra Adivinada!',
      text: `¡Ganaste ${this.scorePerWord} puntos! ¿Quieres seguir jugando?`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Seguir jugando',
      cancelButtonText: 'Guardar y salir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restartGame();
      } else {
        this.gameResultService.saveResult(this.currentScore, 'Ahorcado')
        this.router.navigate(['/home']);
      }
    });
  }

    showGameLostToast(): void {
    Swal.fire({
      title: '¡Has perdido!',
      text: `La palabra era "${this.hiddenWord}". ¿Quieres intentarlo de nuevo?`,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Jugar de nuevo',
      cancelButtonText: 'Guardar y salir'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restartGame();
      } else {
        if(this.currentScore > 0){
          this.gameResultService.saveResult(this.currentScore, 'Ahorcado')
        }
        this.router.navigate(['/home']);
        
      }
    });
  }

}
