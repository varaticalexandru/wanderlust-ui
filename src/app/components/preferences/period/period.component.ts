import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { Subscription, debounceTime, fromEvent } from 'rxjs';
import { PreferencesService } from 'src/app/services/preferences/preferences.service';
<<<<<<< HEAD
<<<<<<< HEAD
import { FooterComponent } from '../../footer/footer.component';
import { MyErrorStateMatcher } from '../../login/login.component';
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b

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
<<<<<<< HEAD
<<<<<<< HEAD
      MatButton,
      FooterComponent,
=======
      MatButton
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
=======
      MatButton
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
    ]
})
export class PeriodComponent implements OnInit, OnDestroy, AfterViewInit {

  matcher: ErrorStateMatcher = new MyErrorStateMatcher();
  resizeSubscription: Subscription;

  range!: DateRange;
  startDate!: Date;
  endDate!: Date;
  minDate: Date;
  maxDate: Date;
  isRangeEmpty!: boolean;
  isRangeValid!: boolean;
  disabledDates!: Array<DateRangeDescriptor>;
  monthsViewNumber!: number;
  dailyRecommendationsNumber!: number;

  @ViewChild('igxcalendar')
  calendar!: IgxCalendarComponent;

  constructor(
    private router: Router,
    private preferencesService: PreferencesService
  ) {
    this.monthsViewNumber = window.innerWidth < 800 ? 1 : 2;
    this.startDate = new Date();
    this.endDate = new Date();
    this.isRangeValid = false;
    this.isRangeEmpty = true;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.minDate.getFullYear() + 1);
    this.dailyRecommendationsNumber = 5;
    this.range = {
      start: this.startDate,
      end: this.endDate
    }
    this.disabledDates = [
      { type: DateRangeType.Before, dateRange: [this.minDate] },
      { type: DateRangeType.After, dateRange: [this.maxDate] }
    ];
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe((event: any) => {
        this.monthsViewNumber = event.target.innerWidth < 800 ? 1 : 2;
      })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription)
      this.resizeSubscription.unsubscribe();
  }

  handleDateSelection(event: Date | Date[]) {
    const selectedDates: Date[] = event as Date[];
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
  }


  isRangeInvalid(): boolean {
    return daysNumberInRange(new Date(this.range.start), new Date(this.range.end)) > 7;
  }

  next() {
    this.preferencesService.setPreference('period', {
      'startDate': this.range.start as Date,
      'endDate': this.range.end as Date
    });

    this.preferencesService.setPreference('dailyRecommendationsNumber', this.dailyRecommendationsNumber);

    this.router.navigate(['/preferences/companion']);
  }

  back() {
    this.router.navigate(['/preferences/destination'])
  }

}

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl): boolean {
    return control && control.invalid;
  }

}

<<<<<<< HEAD
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
=======
>>>>>>> f3b8e49dd56df145f298594f58854a11e8b0e04b
