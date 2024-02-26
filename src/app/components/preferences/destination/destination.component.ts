import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss']
})
export class DestinationComponent implements OnInit{


  destinations:any = [
      {"city": "Istanbul", "image": "https://via.placeholder.com/150"},
      {"city": "London", "image": "https://via.placeholder.com/150"},
      {"city": "Punta Cana", "image": "https://via.placeholder.com/150"},
      {"city": "Miami Beach", "image": "https://via.placeholder.com/150"},
      {"city": "Puerto Morelos", "image": "https://via.placeholder.com/150"},
      {"city": "Honolulu", "image": "https://via.placeholder.com/150"}    
  ];

  constructor(

  ) {

   }

  ngOnInit(): void {
      
  }


}
