import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlacePhotoUriResponse, PlacePhotosResponse } from 'src/app/models/google-maps/place-photo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoSearchService {


  max_width_px: number = 1600;
  skip_http_redirect: boolean = true;

  fields: string = 'photoUri';

  options = {
    headers: new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json')
      .append('X-Goog-Api-Key', `${environment.googleMaps.api_key}`),
  };

  photos_url = `${environment.googleMaps.place_details_uri}`;
  photos_url_suffix = `/media?max_width_px=${this.max_width_px}&fields=${this.fields}&skipHttpRedirect=${this.skip_http_redirect}`;

  constructor(
    private http: HttpClient
  ) {}

  fetchPhotoById(photoId: string): Observable<PlacePhotoUriResponse> {
    return this.http.get<PlacePhotoUriResponse>(
      `${this.photos_url}/${photoId}${this.photos_url_suffix}`,
      this.options
    );
  }
}
