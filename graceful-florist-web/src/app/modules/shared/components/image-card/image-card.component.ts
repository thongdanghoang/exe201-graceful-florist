import {Component, Input} from '@angular/core';

@Component({
  selector: 'graceful-florist-image-card',
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.css'
})
export class ImageCardComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() description!: string;

  constructor() {}
}
