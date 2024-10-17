import {Pipe, PipeTransform} from '@angular/core';
import {OrderStatus} from '../../orders/models/order.dto';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {
  transform(value: OrderStatus, defaultValue: string = ''): string {
    switch (value) {
      case OrderStatus.CANCELLED:
        return 'Đã hủy';
      case OrderStatus.DELIVERED:
        return 'Đã giao';
      case OrderStatus.PROCESSING:
        return 'Đang xử lý';
      case OrderStatus.DELIVERING:
        return 'Đang giao';
      case OrderStatus.DEPOSITED:
        return 'Đã đặt cọc';
      case OrderStatus.PENDING:
        return 'Chờ xử lý';
      case OrderStatus.RATED:
        return 'Đã đánh giá';
      default:
        return defaultValue;
    }
  }
}
