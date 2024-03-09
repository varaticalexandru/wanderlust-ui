import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AmadeusAuthService } from '../amadeus-auth/amadeus-auth.service';
import { AmadeusDestinations } from 'src/app/models/amadeus/amadeus-destinations';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchDestinationService {

  max_results = 10;
  token: string = '';
  token_type: string = '';

  constructor(
    private http: HttpClient,
    private amadeusAuth: AmadeusAuthService,
  ) {
    this.amadeusAuth.token$.subscribe({
      next: (token: string) => {
        this.token = token;
      }
    });

    this.amadeusAuth.token_type$.subscribe({
      next: (token_type: string) => {
        this.token_type = token_type;
      }
    });
   }

  searchDestinations(searchTerm: string): Observable<AmadeusDestinations> {
    let options = {
      headers: new HttpHeaders().append('Authorization', `${this.token_type} ${this.token}`),
      params: new HttpParams().append('keyword', searchTerm).append('max', this.max_results)
    };

    return this.http.get<AmadeusDestinations>(environment.amadeus.search_destination_url, options).pipe(
      catchError((error: any) => {
        console.error('Error searching destinations: ', error);
        // throw error;
        return [];
      }));
  }
}
