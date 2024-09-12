import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppRoutingConstants} from '../app-routing-constants';

@Component({
  selector: 'graceful-florist-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private readonly router: Router) {}

  navigate(path: string): void {
    void this.router.navigate([path]);
  }

  protected readonly AppRoutingConstants = AppRoutingConstants;
}
