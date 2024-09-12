import {Component, Input} from '@angular/core';

@Component({
  selector: 'graceful-florist-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent {
  @Input() comment!: string;
  @Input() name!: string;
  @Input() avatar_url!: string;
}
