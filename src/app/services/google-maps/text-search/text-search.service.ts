import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlacePhotosResponse } from 'src/app/models/google-maps/place-photo.model';
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
    'places.photos.name',
  ];

  id_fields: string = 'places.id';
  photos_fields: string = 'photos.name';

  options = {
    headers: new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json')
      .append('X-Goog-Api-Key', `${environment.googleMaps.api_key}`),
  };


  text_search_url = `${environment.googleMaps.search_text_uri}?fields=${this.fields.join()}`
  place_id_url = `${environment.googleMaps.search_text_uri}?fields=${this.id_fields}`
  place_photos_url = `${environment.googleMaps.place_details_uri}/places`

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

  fetchPlaceId(
    placeDatailsReq: PlacesDetailsRequest
  ): Observable<PlaceDetailsResponse> {
    return this.http.post<PlaceDetailsResponse>(
      this.place_id_url,
      placeDatailsReq,
      this.options
    );
  }

  fetchPlacePhotoIds(placeId: string): Observable<PlacePhotosResponse> {
    return this.http.get<PlacePhotosResponse>(
      `${this.place_photos_url}/${placeId}?fields=${this.photos_fields}`,
      this.options
    );
  }
}
