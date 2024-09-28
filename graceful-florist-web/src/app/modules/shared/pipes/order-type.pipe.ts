import {Pipe, PipeTransform} from '@angular/core';
import {OrderType} from '../../orders/models/order.dto';

@Pipe({
  name: 'orderType'
})
export class OrderTypePipe implements PipeTransform {
  transform(value: OrderType, defaultValue: string = ''): string {
    switch (value) {
      case OrderType.SPECIAL:
        return 'Đặc biệt';
      case OrderType.NORMAL:
        return 'Bình thường';
      default:
        return defaultValue;
    }
  }
}
