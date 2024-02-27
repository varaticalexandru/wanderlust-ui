import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popular-destination',
  templateUrl: './popular-destination.component.html',
  styleUrls: ['./popular-destination.component.scss']
})
export class PopularDestinationComponent {
  @Input() name: string = '';
  @Input() image: string = '';
}
