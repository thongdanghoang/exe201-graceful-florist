import {Pipe, PipeTransform} from '@angular/core';
import {ProductStatus} from '../../products/models/product.dto';

@Pipe({
  name: 'productStatus'
})
export class ProductStatusPipe implements PipeTransform {
  transform(value: ProductStatus, defaultValue: string = ''): string {
    switch (value) {
      case ProductStatus.SELLING:
        return 'Đang mở bán';
      case ProductStatus.NOT_SELLING:
        return 'Chưa bán';
      default:
        return defaultValue;
    }
  }
}
