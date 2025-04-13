import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email = '';
  password = '';
  errorMessage: string | null | undefined = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  signUp() {
    this.authService.signUp(this.email, this.password).then((data) => {
        if (data) {
          this.router.navigate(['/home']);
        }
    });
  }
  
}
