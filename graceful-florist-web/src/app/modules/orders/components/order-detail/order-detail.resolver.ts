import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {OrderDto} from './order-detail.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const orderDetailResolver: ResolveFn<OrderDto> = (route, _state) => {
  return inject(OrdersService).getOrderById(route.paramMap.get('id') as string);
};
