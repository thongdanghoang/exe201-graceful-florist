import {Pipe, PipeTransform} from '@angular/core';
import {ProductStatus} from '../../products/models/product.dto';

@Pipe({
  name: 'productStatus'
})
export class ProductStatusPipe implements PipeTransform {
  private _args: unknown;
  transform(value: ProductStatus, ...args: unknown[]): string {
    this._args = args;
    switch (value) {
      case ProductStatus.SELLING:
        return 'Đang mở bán';
      case ProductStatus.NOT_SELLING:
        return 'Chưa bán';
      default:
        return '';
    }
  }
}
