import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CountriesApiService } from '../countries-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent implements OnInit {
  countries: any[] = [];
  remainingCountries: any[] = [];
  currentFlagUrl: string = '';
  options: string[] = [];
  correctAnswer: string = '';
  lives = 3;
  score = 0;

  private allowedCountries = [
    'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'China',
    'Colombia', 'Cuba', 'Denmark', 'Egypt', 'Finland', 'France', 'Germany', 'Greece',
    'Hungary', 'India', 'Indonesia', 'Iran', 'Ireland', 'Israel', 'Italy', 'Jamaica',
    'Japan', 'Kenya', 'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand',
    'Nigeria', 'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Romania', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea',
    'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Tunisia', 'Turkey', 'Ukraine',
    'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Venezuela',
    'Vietnam'
  ];

  constructor(private countriesService: CountriesApiService){}

    
  ngOnInit() {
    this.countriesService.fetchCountries().subscribe(data => {
      this.remainingCountries = data
        .filter(c =>
          c.flags?.png &&
          c.name?.common &&
          this.allowedCountries.includes(c.name.common) &&
          c.translations?.spa?.common
        )
        .map(c => ({
          name: c.translations.spa.common,
          flag: c.flags.png
        }));

        this.countries = [... this.remainingCountries];
      this.generateQuestion();
    });
  }



  generateQuestion(){
      if (this.remainingCountries.length === 0) {
    Swal.fire({
      icon: 'success',
      title: '¡Ganaste!',
      text: `Puntuación final: ${this.score}`,
      toast: false
    });
    this.score = 0;
    this.lives = 3;
    this.remainingCountries = [...this.countries]; // reset for replay
    return;
  }

    const correct = this.getRandomFromRemaining();
    this.correctAnswer = correct.name;
    this.currentFlagUrl = correct.flag;

    this.remainingCountries = this.remainingCountries.filter(c => c.name !== correct.name);

    const optionsSet = new Set<string>([this.correctAnswer]);
      while (optionsSet.size < 4) {
      const option = this.getRandomCountry().name;
      if (option !== this.correctAnswer) {
        optionsSet.add(option);
      }
    }

    this.options = Array.from(optionsSet).sort(() => Math.random() - 0.5);
  }

  getRandomFromRemaining() {
  const index = Math.floor(Math.random() * this.remainingCountries.length);
  return this.remainingCountries[index];
}





  getRandomCountry(){
    const index = Math.floor(Math.random() * this.countries.length);
    return this.countries[index];
  }

    selectOption(option: string) {
    if (option === this.correctAnswer) {
      this.score += 5;
      Swal.fire({ icon: 'success', title: 'Correcto!', toast: true, timer: 1000, position: 'top-end', showConfirmButton: false });
    } else {
      this.lives--;
      Swal.fire({ icon: 'error', title: 'Equivocado!', toast: true, timer: 1000, position: 'top-end', showConfirmButton: false });
    }

    if (this.lives <= 0) {
      Swal.fire({ title: 'Perdiste!', text: `Tu puntaje: ${this.score}`, icon: 'info' });
      this.score = 0;
      this.lives = 3;
      this.remainingCountries = [...this.countries];
      return;
    }

    this.generateQuestion();
  }

}
