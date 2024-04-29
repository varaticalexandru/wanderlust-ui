import { Component, Input, inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';



@Component({
  selector: 'app-chips-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './chips-input.component.html',
  styleUrl: './chips-input.component.scss'
})
export class ChipsInputComponent {

  @Input()
  options!: string[];

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  announcer = inject(LiveAnnouncer);


  constructor() {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.options.push(value);
    }

    event.chipInput!.clear();
  }

  remove(option: string): void {
    const index = this.options.indexOf(option);

    if (index >= 0) {
      this.options.splice(index, 1);

      this.announcer.announce(`Removed ${option}`);
    }
  }

  edit(option: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(option);
      return;
    }

    const index = this.options.indexOf(option);
    if (index >= 0) {
      this.options[index] = value;
    }
  }

  getSelectedOptions(): Array<string> {
    return this.options;
  }

}
