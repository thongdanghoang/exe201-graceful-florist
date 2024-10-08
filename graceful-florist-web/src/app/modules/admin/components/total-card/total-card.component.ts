import {Component, Input} from '@angular/core';

@Component({
  selector: 'graceful-florist-total-card',
  templateUrl: './total-card.component.html',
  styleUrl: './total-card.component.css'
})
export class TotalCardComponent {
  @Input() title: string | undefined;
  @Input() value: number | undefined;
  @Input() icon: string | undefined;
  @Input() percentageChange: number | undefined;
  @Input() changeDescription: string | undefined;
  @Input() formatCurrency: boolean = false;

  get formattedPercentageChange(): string {
    return this.percentageChange
      ? `${this.percentageChange.toFixed(2)}%`
      : '0%';
  }
}
