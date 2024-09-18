import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'graceful-florist-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Output() readonly countChanged: EventEmitter<number> =
    new EventEmitter<number>();
  @Input() count: number = 0;
  @Input() isSigned: boolean = false;

  protected increment(): void {
    this.count++;
    this.countChanged.emit(this.count);
  }

  protected decrement(): void {
    if (this.isSigned && this.count === 0) {
      return;
    }
    this.count--;
    this.countChanged.emit(this.count);
  }
}
