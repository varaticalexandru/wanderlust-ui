import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { DateRange, IgxDateRangePickerComponent, IgxLabelDirective, IgxHintDirective, IgxPickerClearComponent, IgxIconComponent, IgxPickerToggleComponent, IgxCalendarComponent, IgxCalendarModule, IgxDateRangeStartComponent, IgxDateRangeEndComponent, IgxOverlayOutletDirective, DateRangeDescriptor, DateRangeType } from 'igniteui-angular';
import { NgClass, NgIf } from '@angular/common';
import { AbstractControl, FormControl, FormGroupDirective, FormsModule, NgForm, Validators } from '@angular/forms';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { HammerModule } from '@angular/platform-browser';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import { daysNumberInRange } from 'src/app/utils/distance-in-days';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss'],
  standalone: true,
  imports:
    [
      MatCard,
      MatCardTitle,
      MatCardContent,
      IgxDateRangePickerComponent,
      FormsModule,
      IgxLabelDirective,
      NgIf,
      IgxHintDirective,
      RouterOutlet,
      IgxPickerClearComponent,
      IgxIconComponent,
      IgxPickerToggleComponent,
      NgClass,
      IgxCalendarComponent,
      HammerModule,
      IgxDateRangeStartComponent,
      IgxDateRangeEndComponent,
      MatInputModule,
      MatFormFieldModule,
      MatIconModule,
      MatButton
    ]
})
export class PeriodComponent implements OnInit, AfterViewInit {

  matcher: ErrorStateMatcher = new MyErrorStateMatcher();

  range!: DateRange;
  startDate!: Date;
  endDate!: Date;
  minDate: Date;
  maxDate: Date;
  isRangeEmpty!: boolean;
  isRangeValid!: boolean;
  disabledDates!: Array<DateRangeDescriptor>;

  @ViewChild('igxcalendar')
  calendar!: IgxCalendarComponent;

  constructor(
    private router: Router
  ) {
    this.startDate = new Date();
    this.endDate = new Date();
    this.isRangeValid = true;
    this.isRangeEmpty = true;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.minDate.getFullYear() + 1);
    this.range = {
      start: this.startDate,
      end: this.endDate
    }
    this.disabledDates = [
      { type: DateRangeType.Before, dateRange: [this.minDate] },
      { type: DateRangeType.After, dateRange: [this.maxDate] }
    ];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  handleDateSelection(event: Date | Date[]) {
    const selectedDates: Date[] = event as Date[];
    console.log(selectedDates);
    const offset = selectedDates[0]?.getTimezoneOffset();

    if (selectedDates.length === 1) {
      const adjustedDate = new Date(selectedDates[0].getTime() - (offset * 1000 * 60));
      this.range.start = this.range.end = adjustedDate.toISOString().slice(0, 10);
    }
    else if (selectedDates.length > 1) {
      const adjustedStartDate = new Date(selectedDates[0].getTime() - (offset * 1000 * 60));
      const adjustedEndDate = new Date(selectedDates[selectedDates.length - 1].getTime() - (offset * 1000 * 60));
      this.range.start = adjustedStartDate.toISOString().slice(0, 10);
      this.range.end = adjustedEndDate.toISOString().slice(0, 10);
    }
    else if (selectedDates.length === 0) {
      this.range.start = this.range.end = '';
    }

    this.isRangeEmpty = selectedDates.length === 0 ? true : false;
    this.isRangeValid = !this.isRangeEmpty && selectedDates.length <= 7;

    console.log("start: " + this.range.start);
    console.log("end: " + this.range.end);
    console.log("isRangeValid: " + this.isRangeValid);
    console.log("isRangeEmpty: " + this.isRangeEmpty);
  }


  isRangeInvalid(): boolean {
    console.log("isRangeInvalid(): " + (daysNumberInRange(new Date(this.range.start), new Date(this.range.end)) > 7));
    return daysNumberInRange(new Date(this.range.start), new Date(this.range.end)) > 7;
  }

  next() {

  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl): boolean {
    return control && control.invalid;
  }

}

