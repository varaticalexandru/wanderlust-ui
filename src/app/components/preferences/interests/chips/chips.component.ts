import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [
    MatChipsModule
  ],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {
  
  @Input()
  options!: Array<string>;

  constructor() {

  }
}
