import {Component, ViewChild, signal} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatChipListboxChange} from '@angular/material/chips';
import {FormControl, FormGroup} from '@angular/forms';
import {MatExpansionPanel} from '@angular/material/expansion';
import {MatSelectChange} from '@angular/material/select';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'graceful-florist-date-time-picker',
  templateUrl: './graceful-florist-time-picker.component.html',
  styleUrl: './graceful-florist-time-picker.component.css'
})
export class GracefulFloristTimePickerComponent {
  @ViewChild(MatExpansionPanel) panel!: MatExpansionPanel;
  readonly panelOpenState = signal(false);
  availableTimeRange: ChipColor[] = [
    {name: 'Buổi Sáng (8:30 ~ 12:00)', color: 'primary'},
    {name: 'Buổi Chiều (12:00 ~ 17:00)', color: 'primary'},
    {name: 'Buổi Tối (17:00 ~ 20:30)', color: 'primary'},
    {name: 'Giao Hàng Nhanh (1-2 giờ)', color: 'primary'},
    {name: 'Tùy Chọn', color: 'primary'}
  ];
  selectedHour: number = 12;
  selectedMinute: number = 0;
  hours: number[] = Array.from({length: 24}, (_, i) => i);
  minutes: number[] = Array.from({length: 60}, (_, i) => i);
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });
  selectedChip: string | null = null;

  selectHour(hour: MatSelectChange): void {
    this.selectedHour = hour.value;
  }

  selectMinute(minute: MatSelectChange): void {
    this.selectedMinute = minute.value;
  }

  selectChip(chip: MatChipListboxChange): void {
    this.selectedChip = chip.value;
  }

  closePanel(): void {
    this.panel.close();
  }

  get displaySelectedTime(): string {
    switch (this.selectedChip) {
      case 'Buổi Sáng (8:30 ~ 12:00)': {
        return this.availableTimeRange[0].name;
      }
      case 'Buổi Chiều (12:00 ~ 17:00)': {
        return this.availableTimeRange[1].name;
      }
      case 'Buổi Tối (17:00 ~ 20:30)': {
        return this.availableTimeRange[2].name;
      }
      case 'Giao Hàng Nhanh (1-2 giờ)': {
        return this.availableTimeRange[3].name;
      }
      case 'Tùy Chọn': {
        return `Tùy Chọn: ${this.selectedHour}:${this.selectedMinute}`;
      }
      default: {
        return 'Chọn giờ';
      }
    }
  }
}
