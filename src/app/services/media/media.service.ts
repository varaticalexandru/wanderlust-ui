import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Medias } from 'src/app/models/pixabay/medias.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  image_type = 'photo';
  orientation = 'horizontal';
  category = 'travel';
  per_page = 3;

  constructor(
    private http: HttpClient
  ) { }


  fetchMediaByQuery(query: string): Observable<Medias> {

    let options = {
      params: new HttpParams()
        .append('q', query)
        .append('image_type', this.image_type)
        .append('orientation', this.orientation)
        .append('category', this.category)
        .append('per_page', this.per_page)
    };

    return this.http.get<Medias>(environment.pixabay.fetch_media_url, options).pipe(
      catchError((error: any) => {
        console.error('Error searching destinations: ', error);
        // throw error;
        return [];
      })
    );
  }
}
