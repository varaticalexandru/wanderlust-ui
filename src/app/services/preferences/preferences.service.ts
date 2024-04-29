import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Period } from 'src/app/models/period.model';
import { Preferences } from 'src/app/models/preferences.model';
import { Destination } from 'src/app/models/user-destination.model';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private preferences = new BehaviorSubject<Preferences>( {} );
  
  constructor() { }

  setPreference(key: string, value: Destination | Period | string | boolean | Array<string>) {
    this.preferences.next({ ...this.preferences.value, [key]: value });
  }

  getPreferences() : Observable<Preferences> {
    return this.preferences.asObservable();
  }

}
