import { Component, OnInit } from '@angular/core';
// import { AmadeusAuthService } from './services/amadeus-auth/amadeus-auth.service';
// import { Subscription } from 'rxjs';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
      RouterModule,
      RouterOutlet,
      NavbarComponent,
      FooterComponent,
    ]
})
export class AppComponent implements OnInit {

  constructor(
    // private amadeusAuthService: AmadeusAuthService
  ) {}

  ngOnInit() {
    // this.amadeusAuthService.token_data$.subscribe({});
  }

  ngOnDestroy() {
    
  }
}
