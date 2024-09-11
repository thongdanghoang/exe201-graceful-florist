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
  templateUrl: './graceful-florist-date-time-picker.component.html',
  styleUrl: './graceful-florist-date-time-picker.component.css'
})
export class GracefulFloristDateTimePickerComponent {
  @ViewChild(MatExpansionPanel) panel!: MatExpansionPanel;
  readonly panelOpenState = signal(false);
  selected: Date | null = null;
  availableColors: ChipColor[] = [
    {name: 'Buổi Sáng (8:30 ~ 12:00)', color: 'primary'},
    {name: 'Buổi Chiều (12:00 ~ 17:00)', color: 'primary'},
    {name: 'Buổi Tối (17:00 ~ 20:30)', color: 'primary'},
    {name: 'Giao Hàng Nhanh (1-2 giờ)', color: 'primary'},
    {name: 'Tùy Chọn', color: 'primary'}
  ];
  hours: number[] = Array.from({length: 24}, (_, i) => i);
  selectedHour: number | null = null;
  minutes: number[] = Array.from({length: 60}, (_, i) => i);
  selectedMinute: number | null = null;
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

  formatDate(date: Date | null): string {
    if (date) {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    return 'Chọn ngày';
  }

  closePanel(): void {
    this.panel.close();
  }
}
