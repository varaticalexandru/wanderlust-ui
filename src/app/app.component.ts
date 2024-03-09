import { Component } from '@angular/core';
import { AmadeusAuthService } from './services/amadeus-auth/amadeus-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private amadeusAuthService: AmadeusAuthService
  ) {
    
  }
}
