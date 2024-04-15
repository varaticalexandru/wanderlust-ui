import { Component, Input } from '@angular/core';
import { Destination } from 'src/app/models/user-destination';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-search-result-card',
    templateUrl: './search-result-card.component.html',
    styleUrls: ['./search-result-card.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardContent, MatIcon]
})
export class SearchResultCardComponent {

  @Input() destination!: Destination;
}
