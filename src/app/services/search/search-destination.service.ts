import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { AmadeusAuthService } from '../amadeus-auth/amadeus-auth.service';
import { AmadeusDestinations } from 'src/app/models/amadeus-destinations';

@Injectable({
  providedIn: 'root'
})
export class SearchDestinationService {

  BASE_URL = 'https://test.api.amadeus.com/v1/reference-data/locations/cities';
  token = '';
  token_type = 'Bearer';
  max_results = '10';

  constructor(
    private http: HttpClient,
    private amadeusAuth: AmadeusAuthService,
  ) {
    amadeusAuth.getAuthToken().subscribe((data: any) => {
      this.token = data.access_token;
    });
   }

  searchDestinations(searchTerm: string): Observable<any> {
    let options = {
      headers: new HttpHeaders().append('Authorization', `${this.token_type} ${this.token}`),
      params: new HttpParams().append('keyword', searchTerm).append('max', this.max_results)
    };

    return this.http.get<AmadeusDestinations>(this.BASE_URL, options).pipe(
      catchError((error: any) => {
        console.error('Error searching destinations: ', error);
        // throw error;
        return [];
      }));
  }
}
