import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.auth.onAuthStateChange((session) =>{
      if(!session){
        this.router.navigate(['/login']);
      }
    });
  }





}
