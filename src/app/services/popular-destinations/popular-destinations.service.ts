import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, catchError, shareReplay, switchMap, take, tap } from 'rxjs';
import { PopularDestinations } from 'src/app/models/amadeus/amadeus-popular-destinations.model';
import { environment } from 'src/environments/environment';
import { AmadeusAuthService } from '../amadeus-auth/amadeus-auth.service';

@Injectable({
  providedIn: 'root'
})
export class PopularDestinationsService {


  private popularDestinations = new ReplaySubject<PopularDestinations>(1);
  popularDestinations$ = this.popularDestinations.asObservable();

  token: string = '';
  token_type: string = '';
  max = 20;
  origin_city_code = 'FRA';
  year_offset = 3;
  period = `${new Date().getFullYear() - this.year_offset}` + '-' + `${new Date().getMonth() + 1}`.padStart(2, '0');
  page_limit = 20;
  page_offset = 0;
  sort = 'analytics.travelers.score';


  constructor(
    private http: HttpClient,
    private amadeusAuth: AmadeusAuthService
  ) {
    this.amadeusAuth.token_data$.pipe(
      switchMap((token_data: any): Observable<PopularDestinations> => {
        this.token = token_data.access_token;
        this.token_type = token_data.token_type;

        return this.getPopularDestinations();
      }),
      tap(popularDestinations => this.popularDestinations.next(popularDestinations)),
      shareReplay(1)
    ).subscribe();
  }

  getPopularDestinations(): Observable<PopularDestinations> {
    let options = {
      headers: new HttpHeaders().append('Authorization', `${this.token_type} ${this.token}`),
      params: new HttpParams()
        .append('originCityCode', this.origin_city_code)
        .append('max', this.max)
        .append('period', this.period)
        .append('sort', this.sort)
        .append('page[limit]', this.page_limit)
        .append('page[offset]', this.page_offset)
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
