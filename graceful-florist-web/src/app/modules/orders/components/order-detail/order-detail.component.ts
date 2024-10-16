import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {OrderDto, OrderItemDto} from '../../models/order.dto';
import {uuid} from '../../../../../../graceful-florist-type';
import {AppRoutingConstants} from '../../../../app-routing-constants';

@Component({
  selector: 'graceful-florist-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  productDisplayedColumns: string[] = ['name', 'price', 'quantity'];
  orderItems: OrderItemDto[] = [];
  protected orderDto!: OrderDto;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    super();
  }
  ngOnInit(): void {
    this.registerSubscription(
      this.activatedRoute.data.subscribe((data: any): void => {
        this.orderDto = data.order;
        this.orderItems = this.orderDto.orderItems;
        console.log(this.orderItems);
      })
    );
  }

  protected navigateBack(): void {
    void this.router.navigate([AppRoutingConstants.USER_ORDERS]);
  }

  protected simplifyUUID(id: uuid | undefined): string {
    return id.toString().split('-')[0] ?? '';
  }
}
