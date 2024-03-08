import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopularDestinationsService {

  constructor(
    private http: HttpClient
  ) { }

  getPopularDestinations() {
    return  
  }
}
