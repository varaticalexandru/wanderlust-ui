import { Component, Input } from '@angular/core';
import { PopularDestination } from 'src/app/models/popular-destination';

@Component({
  selector: 'app-popular-destination-card',
  templateUrl: './popular-destination-card.component.html',
  styleUrls: ['./popular-destination-card.component.scss']
})
export class PopularDestinationCardComponent {

  @Input() popularDestination!: PopularDestination;
}
