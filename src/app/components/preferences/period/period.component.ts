import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateRange } from 'igniteui-angular';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {

  range: DateRange = { 
    start: new Date(2024, 3, 20), 
    end: new Date(2024, 3, 25) 
  };

  constructor() {
    router: Router
  }

  ngOnInit(): void {
   
  }

  

}
