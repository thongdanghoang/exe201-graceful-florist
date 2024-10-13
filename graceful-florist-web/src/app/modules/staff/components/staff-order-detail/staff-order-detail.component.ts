import {Component, OnInit} from '@angular/core';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {OrderDto, OrderStatus} from '../../../orders/models/order.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {OrdersService} from '../../../orders/services/orders.service';
import {AppRoutingConstants} from '../../../../app-routing-constants';

@Component({
  selector: 'graceful-florist-staff-order-detail',
  templateUrl: './staff-order-detail.component.html'
})
export class StaffOrderDetailComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  orderDto: OrderDto | undefined;

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

  updateOrderStatus(status: OrderStatus): void {
    if (this.orderDto) {
      this.orderDto = {
        ...this.orderDto,
        status
      };
      void this.ordersService.updateOrderStatus(this.orderDto).subscribe();
    }
  }

  goBack(): void {
    void this.router.navigate([
      `${AppRoutingConstants.STAFF_PATH}/${AppRoutingConstants.STAFF_ORDERS_PATH}`
    ]);
  }

  get productId(): string {
    return this.orderDto?.id.toString().split('-')[0];
  }

  get orderStatus(): OrderStatus {
    return this.orderDto ? this.orderDto.status : OrderStatus.PROCESSING;
  }

  get OrdersStatus(): OrderStatus[] {
    return Object.values(OrderStatus);
  }
}
