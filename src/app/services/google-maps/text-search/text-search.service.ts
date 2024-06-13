import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PlacesDetailsRequest,
  Place,
  PlaceDetailsResponse,
} from 'src/app/models/google-maps/places-details.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TextSearchService {

  fields: Array<string> = [
    'places.id',
    'places.location',
    'places.displayName.text',
  ];

  options = {
    headers: new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json')
      .append('X-Goog-Api-Key', `${environment.googleMaps.api_key}`),
  };

  text_search_url = `${environment.googleMaps.search_text_url}?fields=${this.fields.join()}`

  constructor(private http: HttpClient) {}

  fetchPlaceDetailsByQuery(
    placeDatailsReq: PlacesDetailsRequest
  ): Observable<PlaceDetailsResponse> {
    return this.http.post<PlaceDetailsResponse>(
      this.text_search_url,
      placeDatailsReq,
      this.options
    );
  }
}
