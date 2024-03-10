import { Injectable } from '@angular/core';
import { AmadeusAuthService } from '../amadeus-auth/amadeus-auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airports } from 'src/app/models/amadeus/amadeus-airports';

@Injectable({
  providedIn: 'root'
})
export class AirportCityMappingService {

  token: string = '';
  token_type: string = '';
  sub_type: string = 'AIRPORT';
  page_limit = 1;
  page_offset = 0;
  view = 'LIGHT';

  constructor(
    private http: HttpClient,
    private amadeusAuthService: AmadeusAuthService,

  ) { 
    this.amadeusAuthService.token_data$.subscribe({
      next: (token_data: any) => {
        this.token = token_data.access_token;
        this.token_type = token_data.token_type;
      }
    });
  }

  getAirportDetailsByCode(airportCode: string): Observable<Airports> {
    let options = {
      headers: new HttpHeaders().append('Authorization', `${this.token_type} ${this.token}`),
      params: new HttpParams()
        .append('subType', this.sub_type)
        .append('page[limit]', this.page_limit)
        .append('page[offset]', this.page_offset)
        .append('view', this.view)
        .append('keyword', airportCode)
    }

    return this.http.get<Airports>(environment.amadeus.airport_search_url, options); 


  }


}
