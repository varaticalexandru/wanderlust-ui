import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmadeusAuthService {

  private token_data = new BehaviorSubject<string>('');
  token_data$ = this.token_data.asObservable();

  constructor(
    private http: HttpClient
  ) {
    
  }

  getAuthToken(): Observable<any> {
    let body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', environment.amadeus.api_key)
      .set('client_secret', environment.amadeus.api_secret);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    };

    return this.http.post(environment.amadeus.auth_url, body.toString(), options);
  }

}
