import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { UserDestination } from 'src/app/models/user-destination';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit{

  destination!: UserDestination;

  destinations:any = [
      {"city": "Istanbul", "image": "https://via.placeholder.com/150"},
      {"city": "London", "image": "https://via.placeholder.com/150"},
      {"city": "Punta Cana", "image": "https://via.placeholder.com/150"},
      {"city": "Miami Beach", "image": "https://via.placeholder.com/150"},
      {"city": "Puerto Morelos", "image": "https://via.placeholder.com/150"},
      {"city": "Honolulu", "image": "https://via.placeholder.com/150"}    
  ];

  constructor(
    private router: Router,
    matIconRegistry: MatIconRegistry,

  ) {

   }

  ngOnInit(): void {
      
  }

  initDestinationForm() {
   
  }


}
