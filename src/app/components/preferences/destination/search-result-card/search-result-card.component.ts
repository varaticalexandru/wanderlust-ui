import { Component, Input } from '@angular/core';
import { Destination } from 'src/app/models/user-destination';

@Component({
  selector: 'app-search-result-card',
  templateUrl: './search-result-card.component.html',
  styleUrls: ['./search-result-card.component.scss']
})
export class SearchResultCardComponent {

  @Input() destination!: Destination;
}
