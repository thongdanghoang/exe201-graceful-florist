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

  protected navigateToLoginPage(): void {
    void this.router.navigate([AppRoutingConstants.AUTH_PATH]);
  }

  protected navigateToProducts(): void {
    void this.router.navigate([AppRoutingConstants.PRODUCTS_PATH]);
  }

  protected navigateToCustomization(): void {
    void this.router.navigate([
      `${AppRoutingConstants.PRODUCTS_PATH}/${AppRoutingConstants.CUSTOMIZE_FLOWER_PATH}`
    ]);
  }

  protected navigateToDevMode(): void {
    void this.router.navigate([AppRoutingConstants.DEV_PATH]);
  }

  protected navigateToHomepage(): void {
    void this.router.navigate([AppRoutingConstants.HOME_PATH]);
  }

  protected navigateToOrdersTracking(): void {
    void this.router.navigate([
      `${AppRoutingConstants.ORDERS_PATH}/${AppRoutingConstants.ORDER_TRACKING_PATH}`
    ]);
  }
}
