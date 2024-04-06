import { Component, Input } from '@angular/core';
import { PopularDestination } from 'src/app/models/popular-destination';
import { MatCard, MatCardImage } from '@angular/material/card';

@Component({
    selector: 'app-popular-destination-card',
    templateUrl: './popular-destination-card.component.html',
    styleUrls: ['./popular-destination-card.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardImage]
})
export class PopularDestinationCardComponent {

  @Input() popularDestination!: PopularDestination;
}
