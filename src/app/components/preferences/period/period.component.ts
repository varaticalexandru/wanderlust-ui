import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateRange } from 'igniteui-angular';
import { differenceInDays } from 'src/app/utils/distance-in-days';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
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
