import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { PopularDestinations } from 'src/app/models/amadeus/amadeus-popular-destinations';
import { environment } from 'src/environments/environment';
import { AmadeusAuthService } from '../amadeus-auth/amadeus-auth.service';

@Injectable({
  providedIn: 'root'
})
export class PopularDestinationsService {

  token: string = '';
  token_type: string = '';
  max = 20;
  origin_city_code = 'FRA';
  year_offset = 3;
  period = `${new Date().getFullYear() - this.year_offset}` + '-' + `${new Date().getMonth() + 1}`.padStart(2, '0');
  limit = 20;
  sort = 'analytics.travelers.score';


  constructor(
    private http: HttpClient,
    private amadeusAuth: AmadeusAuthService
  ) { 

    amadeusAuth.token$.subscribe({
      next: (token: string) => {
        this.token = token;
      }
    });

    amadeusAuth.token_type$.subscribe({
      next: (token_type: string) => {
        this.token_type = token_type;
      }
    })
  }

  getPopularDestinations(): Observable<PopularDestinations> {
    let options = {
      headers: new HttpHeaders().append('Authorization', `${this.token_type} ${this.token}`),
      params: new HttpParams()
        .append('originCityCode', this.origin_city_code)
        .append('max', '10')
        .append('period', this.period)
        .append('sort', this.sort)
        .append('limit', this.limit),
    }

    return this.http.get<PopularDestinations>(environment.amadeus.popular_destinations_url, options).pipe(
      catchError((error: any) => {
        console.error('Error searching destinations: ', error);
        // throw error;
        return [];
      })
    );
  }

}
