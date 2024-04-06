import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DateRange, IgxDateRangePickerComponent, IgxLabelDirective, IgxHintDirective } from 'igniteui-angular';
import { differenceInDays } from 'src/app/utils/distance-in-days';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-period',
    templateUrl: './period.component.html',
    styleUrls: ['./period.component.scss'],
    standalone: true,
    imports: [MatCard, MatCardTitle, MatCardContent, IgxDateRangePickerComponent, FormsModule, IgxLabelDirective, NgIf, IgxHintDirective, RouterOutlet]
})
export class PeriodComponent implements OnInit {

  range!: DateRange;
  minDate: Date;
  maxDate: Date;
  isRangeValid!: boolean;

  constructor(
    private router: Router
  ) {

    this.isRangeValid = true;
    this.minDate = new Date();
    this.maxDate = new Date(this.minDate.getFullYear() + 1, 12 - 1, 31);
  }

  ngOnInit(): void {

  }

  onRangeChange(newRange: DateRange) {
    this.isRangeValid = differenceInDays(new Date(newRange.start), new Date(newRange.end)) >= 6
      ? false
      : true;
  }
}
