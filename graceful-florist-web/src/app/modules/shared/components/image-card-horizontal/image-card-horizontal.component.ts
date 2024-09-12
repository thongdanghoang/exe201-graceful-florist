import {Component, Input} from '@angular/core';

@Component({
  selector: 'graceful-florist-image-card-horizontal',
  templateUrl: './image-card-horizontal.component.html',
  styleUrl: './image-card-horizontal.component.css'
})
export class ImageCardHorizontalComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() tags!: string[];
}
