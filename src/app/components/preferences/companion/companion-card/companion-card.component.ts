import { Component, Input } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import { Companion } from 'src/app/models/companion.model';

@Component({
  selector: 'app-companion-card',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './companion-card.component.html',
  styleUrl: './companion-card.component.scss'
})
export class CompanionCardComponent {
  
  @Input()
  companion!: Companion;

  
  constructor() {
    
  }
}
