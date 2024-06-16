import { Component, Input, OnInit, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Budget } from 'src/app/models/budget.model';

@Component({
  selector: 'app-budget-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './budget-card.component.html',
  styleUrl: './budget-card.component.scss',
})
export class BudgetCardComponent implements OnInit {
  @Input() budget!: Budget;
  levels!: Array<number>;
  dollar_svg_path = 'assets\\media\\Dollar_Sign.svg';

  constructor() {}

  ngOnInit(): void {
    this.levels = Array(this.budget.value)
      .fill(null)
      .map((x, i) => i);
  }
}
