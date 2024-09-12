import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppRoutingConstants} from '../app-routing-constants';

@Component({
  selector: 'graceful-florist-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected readonly AppRoutingConstants = AppRoutingConstants;
  constructor(private readonly router: Router) {}

  navigate(path: string): void {
    void this.router.navigate([path]);
  }
}
