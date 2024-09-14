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

  protected navigateToHomepage(): void {
    void this.router.navigate([AppRoutingConstants.HOME_PATH]);
  }

  protected navigateToOrdersTracking(): void {
    void this.router.navigate([
      `${AppRoutingConstants.ORDERS}/${AppRoutingConstants.ORDER_TRACKING_PATH}`
    ]);
  }
}
