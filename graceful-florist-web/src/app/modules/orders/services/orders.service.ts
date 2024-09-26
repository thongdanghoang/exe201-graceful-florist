import {Injectable} from '@angular/core';
import {OrderDto, OrderItemDto} from '../models/order.dto';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor() {}

  getOrderById(id: string): OrderDto {
    return {
      id,
      name: 'Trần Thanh Tân',
      address: '...ận Bình Thạnh, TPHCM',
      phone: '033...1630',
      status: 'chờ xử lý',
      total: 1600000,
      products: this.getMockProducts()
    };
  }

  private getMockProducts(): OrderItemDto[] {
    return [
      {
        id: '2024020827709_134533_1',
        name: 'Nụ hôn Nồng Nàn',
        quantity: 1,
        detail: '33 Cánh Hoa Hồng',
        price: 600000,
        image_url: 'assets/flower-rose.png'
      } as OrderItemDto,
      {
        id: '2024020827709_134533_2',
        name: 'Vũ Điệu Tình Yêu',
        quantity: 1,
        detail: '22 bông hồng trắng',
        price: 1000000,
        image_url: 'assets/flower-love.png'
      } as OrderItemDto,
      {
        id: '2024020827709_134533_3',
        name: 'Nụ hôn Biển Cả ',
        quantity: 1,
        detail: '33 bông hồng xanh băng',
        price: 300000,
        image_url: 'assets/flower-ocean.png'
      } as OrderItemDto
    ];
  }
}
