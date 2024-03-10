import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryMappingService {

  private countryMappings = new Map<string, string>();

  constructor(
    private http: HttpClient
  ) { 
    this.loadCountryMappings();
  }

  loadCountryMappings() {

    let options = { responseType: 'text' as 'text'};
     
    this.http.get(environment.localStorage.country_codes_path, options).subscribe(
      (csvData: any) => {
        let lines = csvData.split('\n');
        lines.forEach((line: string) => {
          // skip header
          if (line.startsWith('Alpha-2 code')) return;
          let parts = line.split(',');
          this.countryMappings.set(parts[0], parts[1]);
        });
      }
    )

  }

  getCountryNameByCode(code: string): string {
    return this.countryMappings.get(code) || code; 
  }

}