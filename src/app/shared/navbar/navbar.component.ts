import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy{
  userEmail : string | null = null;
  private authSubscription: ReturnType<typeof this.auth.onAuthStateChange> | null = null;
  
  
  constructor(private auth: AuthService, private router: Router){
  }
 
  ngOnInit(): void {
    this.authSubscription = this.auth.onAuthStateChange((session) => {
      this.userEmail = session?.user?.email || null;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.data?.subscription?.unsubscribe();
  }

  logout(): void{
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

}
