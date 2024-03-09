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
    amadeusAuthService.getAuthToken().subscribe({
      next: (data: any) => {
        amadeusAuthService.token_data$ = data;
        console.log('Amadeus auth token data: ', data);
      },
      error: (error: any) => {
        console.error('Error getting Amadeus auth token: ', error);
      }
    });
  }
}
