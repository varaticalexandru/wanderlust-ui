import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { Itinerary } from 'src/app/models/itinerary.model';
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

  fetchItineraryByPreferences(preferences: Preferences): Observable<Itinerary> {
    return this.http.post<Itinerary>(
      environment.openai.fetch_recommendations_url,
      preferences
    ).pipe(
      tap((itinerary: Itinerary) => this.itinerarySubject.next(itinerary)),
      catchError((error: any) => {
        console.error("Error fetching itinerary/recommendations: ", error);
        return [];
      })
    );
  }

}
