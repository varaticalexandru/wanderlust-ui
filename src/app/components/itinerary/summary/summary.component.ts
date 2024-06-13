import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit, OnDestroy {

  @Input() destination!: string;
  @Input() tripLength!: number;
  @Input() text!: string;

  constructor() {

  }


  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    
  }
  
  
}
