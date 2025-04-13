import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  userEmail : string | null = null;

  constructor(private auth: AuthService, private router: Router){
  }
 
  ngOnInit(): void {
    this.auth.onAuthStateChange((session) => {
      this.userEmail = session?.user?.email || null;
    });
  }


  logout(): void{
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

}
