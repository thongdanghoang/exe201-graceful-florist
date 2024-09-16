import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {OrdersService} from './orders.service';
import {OrderDto} from '../components/order-detail/order-detail.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const orderDetailResolver: ResolveFn<OrderDto> = (route, _state) => {
  return inject(OrdersService).getOrderById(route.paramMap.get('id') as string);
};
