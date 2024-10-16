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
      `${AppRoutingConstants.ADMIN_PATH}/${AppRoutingConstants.ORDERS_MANAGEMENT_PATH}`
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

  get isCustomProduct(): boolean {
    return (
      this.orderDto?.orderItems.some(
        orderItem => orderItem.product?.owner !== null
      ) ?? false
    );
  }

  get isProductNote(): boolean {
    return (
      this.orderDto?.orderItems.length === 1 &&
      this.orderDto?.orderItems[0].product.notes !== null
    );
  }

  get note(): string {
    if (this.orderDto?.orderItems.length === 1) {
      return this.orderDto.orderItems[0].product.notes;
    }
    return '';
  }
}
