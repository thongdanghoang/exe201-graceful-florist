import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'vndCurrency'
})
export class VndCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null || value === 0) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }
}
