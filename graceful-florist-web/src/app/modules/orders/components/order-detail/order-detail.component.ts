import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {OrderDto, OrderItemDto} from '../../models/order.dto';

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
  constructor(private readonly activatedRoute: ActivatedRoute) {
    super();
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any): void => {
      this.orderDto = data.order;
      this.orderItems = this.orderDto.orderItems;
    });
  }
}
