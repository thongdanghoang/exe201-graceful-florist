import {Pipe, PipeTransform} from '@angular/core';
import {OrderStatus} from '../../orders/models/order.dto';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {
  transform(value: OrderStatus, defaultValue: string = ''): string {
    switch (value) {
      case OrderStatus.PROCESSING:
        return 'Đang xử lý';
      default:
        return defaultValue;
    }
  }
}
