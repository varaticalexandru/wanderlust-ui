import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth-service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router 
  ) {}

  ngOnInit(): void {}

  handleGetStartedClick() {
    this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.router.navigate(['/itineraries']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
