import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { InterestSelection } from 'src/app/models/itinerary.model';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [
    MatChipsModule
  ],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {
  
  @Input()
  ordinal!: number;

  @Input()
  options!: Array<string>;

  selectedOptions!: Array<string>;

  @Output()
  selectionChange = new EventEmitter<InterestSelection>;

  constructor() {
    this.selectedOptions = [];
  }

  onSelectionChange(index: number): void {

    let arrayOption = this.options.at(index) as string;
    let isChecked = this.selectedOptions.find((option: string) => option === arrayOption);
    if (!isChecked)  
      this.selectedOptions.push(arrayOption);
    else {
      let slice_idx = this.selectedOptions.indexOf(arrayOption);
      this.selectedOptions.splice(slice_idx, 1);
    }
    
    this.selectionChange.emit({
      ordinal: this.ordinal,
      selectedOptions: this.selectedOptions
    });
  }

  getSelectedOptions(): Array<string> {
    return this.selectedOptions;
  }
}
