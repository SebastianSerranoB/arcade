import { Component } from '@angular/core';

@Component({
  selector: 'app-mayor-menor',
  standalone: false,
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.scss'
})
export class MayorMenorComponent {

  puntaje = 0;
  vidas = 3;
  mensaje = '';

  cartaActual = 5; // al azar luego
  cartaSiguiente = 7; // simulamos

  jugar(eleccion: 'mayor' | 'menor') {
    const gano = (eleccion === 'mayor' && this.cartaSiguiente > this.cartaActual)
              || (eleccion === 'menor' && this.cartaSiguiente < this.cartaActual);

    if (gano) {
      this.puntaje++;
      this.mensaje = '¡Correcto!';
    } else {
      this.vidas--;
      this.mensaje = '¡Incorrecto!';
    }

    // Simular siguiente ronda
    this.cartaActual = this.cartaSiguiente;
    this.cartaSiguiente = Math.floor(Math.random() * 13) + 1; // 1 al 13
  }
}
