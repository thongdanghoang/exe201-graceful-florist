import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppRoutingConstants} from '../../../../app-routing-constants';

@Component({
  selector: 'graceful-florist-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.css'
})
export class OrderTrackingComponent {
  constructor(private readonly route: Router) {}

  protected navigateToOrderDetail(): void {
    const params = {
      id: '2024020827709_134533'
    };
    void this.route.navigate([`${AppRoutingConstants.ORDERS}`, params]);
  }

  private navigate(path: string): void {
    void this.route.navigate([path]);
  }
}
