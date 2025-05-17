import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { SupabaseClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-survey',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.scss'
})
export class SurveyComponent {
  form: FormGroup;
  private supabase: SupabaseClient;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(98)]],
      phone: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^[0-9]+$/)]],
      likesGames: [false, Validators.requiredTrue],
      favoriteGenre: ['', Validators.required],
      newsletter: [null, Validators.required],
    });

    this.supabase = auth.getClient();
  }


  async onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

  const { name, age, phone, likesGames, favoriteGenre, newsletter } = this.form.value;

  const { error } = await this.supabase.from('surveys').insert([{name, age, phone, likesGames, favoriteGenre, newsletter}]);

    if(error){
      Swal.fire('Error', 'No se pudo enviar la encuesta.', 'error');
    }else{
      Swal.fire('¡Gracias!', 'Encuesta enviada correctamente.', 'success');
      this.form.reset();
    }
  }


  navigateToHome(){
    this.router.navigate(['/home']);
  }



}
