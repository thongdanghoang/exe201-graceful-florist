import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {OrdersService} from '../../../orders/services/orders.service';
import {OrderDto, OrderStatus} from '../../../orders/models/order.dto';
import {AppRoutingConstants} from '../../../../app-routing-constants';

@Component({
  selector: 'graceful-florist-order-detail',
  templateUrl: './admin-order-detail.component.html'
})
export class AdminOrderDetailComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  orderDto: OrderDto | undefined;
  mainImage: string | undefined;

  protected readonly OrderStatus = OrderStatus;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly ordersService: OrdersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscriptions([
      this.ordersService
        .getOrderById(this.route.snapshot.paramMap.get('id') as string)
        .subscribe((orderDto: OrderDto): void => {
          this.orderDto = orderDto;
        })
    ]);
  }

  goBack(): void {
    void this.router.navigate([
      `${AppRoutingConstants.ADMIN_PATH}/${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}`
    ]);
  }

  get orderStatus(): OrderStatus {
    return this.orderDto ? this.orderDto.status : OrderStatus.PROCESSING;
  }

  get OrdersStatus(): OrderStatus[] {
    return Object.values(OrderStatus);
  }
}
