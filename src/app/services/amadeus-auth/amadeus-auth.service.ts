import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmadeusAuthService {

  subscription: Subscription = new Subscription();

  private token_data = new Subject<any>();
  token_data$ = this.token_data.asObservable();


  constructor(
    private http: HttpClient
  ) {

    this.subscription = this.getAuthToken().subscribe({
      next: (token_data: any) => {
        this.token_data.next(token_data);
        console.log(token_data);
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

    return this.http.post(environment.amadeus.auth_uri, body.toString(), options);
  }

}
