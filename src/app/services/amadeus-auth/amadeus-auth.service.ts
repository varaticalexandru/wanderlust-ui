import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmadeusAuthService {

  private token = new BehaviorSubject<string>('');
  token$ = this.token.asObservable();

  private token_type = new BehaviorSubject<string>('');
  token_type$ = this.token_type.asObservable();

  constructor(
    private http: HttpClient
  ) {
    this.getAuthToken().subscribe({
      next: (data: any) => {
        this.token = data.access_token;
        this.token_type = data.token_type;
      },
      error: (error: any) => {
        console.error('Error getting Amadeus auth token: ', error);
      }
    });
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
