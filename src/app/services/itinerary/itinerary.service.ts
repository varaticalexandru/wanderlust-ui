import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Itinerary, ItineraryList } from 'src/app/models/itinerary.model';
import { Preferences } from 'src/app/models/preferences.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  private itinerarySubject = new BehaviorSubject<Itinerary | null>(null);
  itinerary$ = this.itinerarySubject.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  generateItineraryByPreferences(preferences: Preferences): Observable<Itinerary> {
    return this.http.post<Itinerary>(
      environment.openai.fetch_recommendations_uri,
      preferences
    ).pipe(
      tap((itinerary: Itinerary) => this.itinerarySubject.next(itinerary)),
      catchError((error: any) => {
        console.error("Error fetching itinerary/recommendations: ", error);
        return [];
      })
    );
  }

  getAllItineraries(): Observable<ItineraryList> {
    return this.http.get<ItineraryList>(
<<<<<<< HEAD
<<<<<<< HEAD
      environment.itinerary.uri
    );
  }

  getItinerariesByUserId(userId: string): Observable<ItineraryList> {
    return this.http.get<ItineraryList>(
      `${environment.itinerary.uri}/user/${userId}`
=======
      environment.itinerary.url
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
=======
      environment.itinerary.url
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
    );
  }

  getItineraryById(id: string): Observable<Itinerary> {
    return this.http.get<Itinerary>(
<<<<<<< HEAD
<<<<<<< HEAD
      `${environment.itinerary.uri}/${id}`
    );
  }

  createItineraryByUserId(userId: string, itinerary: Itinerary): Observable<Itinerary> {
    return this.http.post<Itinerary>(
      `${environment.itinerary.uri}/user/${userId}`,
=======
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
      `${environment.itinerary.url}/${id}`
    );
  }

  createItinerary(itinerary: Itinerary): Observable<Itinerary> {
    return this.http.post<Itinerary>(
      environment.itinerary.url,
<<<<<<< HEAD
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
      itinerary
    );
  }

  deleteItinerary(id: string): Observable<boolean> {
    return this.http.delete<boolean>(
<<<<<<< HEAD
<<<<<<< HEAD
      `${environment.itinerary.uri}/${id}`
=======
      `${environment.itinerary.url}/${id}`
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
=======
      `${environment.itinerary.url}/${id}`
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
    );
  }

}
