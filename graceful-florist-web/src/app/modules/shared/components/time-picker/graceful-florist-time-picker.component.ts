import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  signal
} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatChipListboxChange} from '@angular/material/chips';
import {FormControl, FormGroup} from '@angular/forms';
import {MatExpansionPanel} from '@angular/material/expansion';
import {MatSelectChange} from '@angular/material/select';

export interface ChipColor {
  id: string;
  name: string;
  color: ThemePalette;
  deliveryTimeFrom: Date;
  deliveryTimeTo: Date;
}

@Component({
  selector: 'graceful-florist-date-time-picker',
  templateUrl: './graceful-florist-time-picker.component.html',
  styleUrl: './graceful-florist-time-picker.component.css'
})
export class GracefulFloristTimePickerComponent {
  @ViewChild(MatExpansionPanel) panel!: MatExpansionPanel;
  @Output() readonly deliveryTimeFromChanged: EventEmitter<Date> =
    new EventEmitter<Date>();
  @Output() readonly deliveryTimeToChanged: EventEmitter<Date> =
    new EventEmitter<Date>();
  readonly panelOpenState = signal(false);
  availableTimeRange: ChipColor[] = [
    {
      id: 'morning',
      name: 'Buổi Sáng (8:30 ~ 12:00)',
      color: 'primary',
      deliveryTimeFrom: new Date(0, 0, 0, 8, 30),
      deliveryTimeTo: new Date(0, 0, 0, 12)
    },
    {
      id: 'afternoon',
      name: 'Buổi Chiều (12:00 ~ 17:00)',
      color: 'primary',
      deliveryTimeFrom: new Date(0, 0, 0, 12),
      deliveryTimeTo: new Date(0, 0, 0, 17)
    },
    {
      id: 'evening',
      name: 'Buổi Tối (17:00 ~ 20:30)',
      color: 'primary',
      deliveryTimeFrom: new Date(0, 0, 0, 17),
      deliveryTimeTo: new Date(0, 0, 0, 20, 30)
    },
    {
      id: 'fast',
      name: 'Giao Hàng Nhanh (1-2 giờ)',
      color: 'primary',
      deliveryTimeFrom: new Date(0, 0, 0, 0),
      deliveryTimeTo: new Date(0, 0, 0, 2)
    },
    {
      id: 'custom',
      name: 'Tùy Chọn',
      color: 'primary',
      deliveryTimeFrom: new Date(0, 0, 0, 0),
      deliveryTimeTo: new Date(0, 0, 0, 0)
    }
  ];
  selectedHour: number = 12;
  selectedMinute: number = 0;
  hours: number[] = Array.from({length: 24}, (_, i) => i);
  minutes: number[] = Array.from({length: 60}, (_, i) => i);
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });
  selectedChip: ChipColor | null = null;

  selectHour(hour: MatSelectChange): void {
    this.selectedHour = hour.value;
    this.deliveryTimeFromChanged.emit(
      new Date(0, 0, 0, this.selectedHour, this.selectedMinute)
    );
  }

  selectMinute(minute: MatSelectChange): void {
    this.selectedMinute = minute.value;
    this.deliveryTimeFromChanged.emit(
      new Date(0, 0, 0, this.selectedHour, this.selectedMinute)
    );
  }

  selectChip(chip: MatChipListboxChange): void {
    this.selectedChip = chip.value;
    if (chip.value.deliveryTimeFrom) {
      this.deliveryTimeFromChanged.emit(chip.value.deliveryTimeFrom);
    }
    if (chip.value.deliveryTimeTo) {
      this.deliveryTimeToChanged.emit(chip.value.deliveryTimeTo);
    }
  }

  closePanel(): void {
    this.panel.close();
  }

  get displaySelectedTime(): string {
    switch (this.selectedChip?.id) {
      case 'morning': {
        return this.availableTimeRange[0].name;
      }
      case 'afternoon': {
        return this.availableTimeRange[1].name;
      }
      case 'evening': {
        return this.availableTimeRange[2].name;
      }
      case 'fast': {
        return this.availableTimeRange[3].name;
      }
      case 'custom': {
        return `Tùy Chọn: ${this.selectedHour}:${this.selectedMinute}`;
      }
      default: {
        return 'Chọn giờ';
      }
    }
  }
}
