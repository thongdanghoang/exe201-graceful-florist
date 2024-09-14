import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';

export interface OrderDto {
  id: string;
  name: string;
  phone: string;
  address: string;
  status: string;
  total: number;
  products: ProductDto[];
}

export interface ProductDto {
  id: string;
  name: string;
  detail: string;
  quantity: number;
  price: number;
  image_url: string;
}

@Component({
  selector: 'graceful-florist-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  displayedColumns: string[] = ['name', 'price', 'quantity'];
  dataSource: ProductDto[] = [];
  protected orderDto!: OrderDto;
  constructor(private readonly activatedRoute: ActivatedRoute) {
    super();
  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any): void => {
      this.orderDto = data.order;
      this.dataSource = this.orderDto.products;
    });
  }
}
