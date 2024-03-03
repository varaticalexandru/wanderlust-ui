import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopularDestination } from 'src/app/models/popular-destination';
import { Destination } from 'src/app/models/user-destination';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { SearchDestinationService } from 'src/app/services/search/search-destination.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit {

  searchTerm: string = '';
  filteredDestinations: Destination[] = [];
  destinations: Array<Destination> = [];
  popularDestinations: PopularDestination[] = [];

  constructor(
    private router: Router,
    private destinationService: SearchDestinationService
  ) {

  }

  ngOnInit(): void {
    this.initDestinations();
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

  initDestinations() {
    this.destinations = [
      {
        "country": "United States",
        "city": "New York"
      },
      {
        "country": "United States",
        "city": "Los Angeles"
      },
      {
        "country": "United States",
        "city": "Chicago"
      },
      {
        "country": "Canada",
        "city": "Toronto"
      },
      {
        "country": "Canada",
        "city": "Vancouver"
      },
      {
        "country": "Canada",
        "city": "Montreal"
      },
      {
        "country": "United Kingdom",
        "city": "London"
      },
      {
        "country": "United Kingdom",
        "city": "Edinburgh"
      },
      {
        "country": "United Kingdom",
        "city": "Manchester"
      },
      {
        "country": "Australia",
        "city": "Sydney"
      },
      {
        "country": "Australia",
        "city": "Melbourne"
      },
      {
        "country": "Australia",
        "city": "Brisbane"
      },
      {
        "country": "Japan",
        "city": "Tokyo"
      },
      {
        "country": "Japan",
        "city": "Kyoto"
      },
      {
        "country": "Japan",
        "city": "Osaka"
      },
    ];
  }

  search() {
    let term = this.searchTerm.toLowerCase();

    this.destinationService.searchDestinations(term).subscribe((data: any) => {
      console.log(data);
    });


  }

}
