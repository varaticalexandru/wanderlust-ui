import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopularDestination } from 'src/app/models/popular-destination';
import { Destination } from 'src/app/models/user-destination';
import { SearchDestinationService } from 'src/app/services/search/search-destination.service';
import { Subject, debounce, debounceTime, distinctUntilChanged, empty, switchMap } from 'rxjs';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  searchTermString: string = '';
  private searchTerm = new Subject<string>();
  destinations: Array<Destination> = [];
  popularDestinations: PopularDestination[] = [];


  // TODO: extract the logic into a generic liveSearch operator
  readonly destinations$ = this.searchTerm.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => this.destinationService.searchDestinations(term))
  );

  constructor(
    private router: Router,
    private destinationService: SearchDestinationService
  ) {

  }

  ngOnInit(): void {
    this.initPopularDestinations();
  }

  initPopularDestinations() {
    this.popularDestinations = [
      { "name": "Las Vegas", "image": "https://media-cdn.tripadvisor.com/media/photo-m/1280/2a/34/2d/28/caption.jpg" },
      { "name": "New York", "image": "https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg" },
      { "name": "Los Angeles", "image": "https://www.introducinglosangeles.com/f/estados-unidos/los-angeles/guia/los-angeles-m.jpg" },
      { "name": "San Francisco", "image": "https://www.planetware.com/photos-large/USCA/california-san-francisco-golden-gate-bridge.jpg" },
      { "name": "San Diego", "image": "https://www.tripsavvy.com/thmb/XIx0gfr_i-ay7XLKJRXakT6FS2M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sunset-at-la-jolla-cove-1278353139-583584d99afb438a9889e8d381b836ed.jpg" },
      { "name": "Chicago", "image": "https://cdn.britannica.com/59/94459-050-DBA42467/Skyline-Chicago.jpg" },
      { "name": "Miami", "image": "https://www.planetware.com/photos-large/USFL/florida-miami-south-beach.jpg" },
    ];
  }




  search(searchTerm: string) {
    let normalizedTerm = searchTerm.trim().toLowerCase();

    normalizedTerm !== '' && normalizedTerm.length > 3  ? this.searchTerm.next(normalizedTerm) : null;
  }

}
