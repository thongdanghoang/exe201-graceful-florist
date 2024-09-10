import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'graceful-florist-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private readonly router: Router) {}
}
