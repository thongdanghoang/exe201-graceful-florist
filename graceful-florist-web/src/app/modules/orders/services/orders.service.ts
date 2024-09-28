import {Injectable} from '@angular/core';
import {
  OrderCriteriaDto,
  OrderDto,
  OrderItemDto,
  OrderStatus,
  OrderType
} from '../models/order.dto';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';
import {Observable, delay, of} from 'rxjs';

const MOCK_ORDER_ITEMS: OrderItemDto[] = [
  {
    id: '2024020827709_134533_1',
    name: 'Nụ hôn Nồng Nàn',
    quantity: 1,
    detail: '33 Cánh Hoa Hồng',
    price: 600000,
    imageUrl: 'assets/flower-rose.png'
  } as OrderItemDto,
  {
    id: '2024020827709_134533_2',
    name: 'Vũ Điệu Tình Yêu',
    quantity: 1,
    detail: '22 bông hồng trắng',
    price: 1000000,
    imageUrl: 'assets/flower-love.png'
  } as OrderItemDto,
  {
    id: '2024020827709_134533_3',
    name: 'Nụ hôn Biển Cả ',
    quantity: 1,
    detail: '33 bông hồng xanh băng',
    price: 300000,
    imageUrl: 'assets/flower-ocean.png'
  } as OrderItemDto
];

const ORDER_MOCK_DATA: OrderDto[] = [
  {
    id: '00001',
    name: 'Trần Thanh Tân',
    address: '408, 5 Chu Văn An, Phường 12, Bình Thạnh, Hồ Chí Minh',
    phone: '033...1630',
    status: OrderStatus.PROCESSING,
    type: OrderType.SPECIAL,
    createdDate: new Date(),
    total: 1600000,
    products: MOCK_ORDER_ITEMS
  },
  {
    id: '00002',
    name: 'Minh',
    address: '106 Lương Ngọc Quyến, Phường 5, Gò Vấp, Hồ Chí Minh',
    phone: '033...1630',
    status: OrderStatus.PROCESSING,
    type: OrderType.NORMAL,
    createdDate: new Date(),
    total: 1600000,
    products: MOCK_ORDER_ITEMS
  },
  {
    id: '00003',
    name: 'Nam',
    address: '86 Đ. Phùng Văn Cung, Phường 7, Phú Nhuận, Hồ Chí Minh',
    phone: '033...1630',
    status: OrderStatus.PROCESSING,
    type: OrderType.NORMAL,
    createdDate: new Date(),
    total: 1600000,
    products: MOCK_ORDER_ITEMS
  },
  {
    id: '00004',
    name: 'Thành',
    address: '80/12 /4 A Dương Quảng Hàm, Phường 5, Gò Vấp, Hồ Chí Minh',
    phone: '033...1630',
    status: OrderStatus.PROCESSING,
    type: OrderType.SPECIAL,
    createdDate: new Date(),
    total: 1600000,
    products: MOCK_ORDER_ITEMS
  },
  {
    id: '00005',
    name: 'Công',
    address: 'quận Bình Thạnh, TPHCM',
    phone: '033...1630',
    status: OrderStatus.PROCESSING,
    type: OrderType.NORMAL,
    createdDate: new Date(),
    total: 1600000,
    products: MOCK_ORDER_ITEMS
  },
  {
    id: '00006',
    name: 'Sơn',
    address: '23 Hoàng Hoa Thám, Phường 6, Bình Thạnh, Hồ Chí Minh',
    phone: '033...1630',
    status: OrderStatus.PROCESSING,
    type: OrderType.NORMAL,
    createdDate: new Date(),
    total: 1600000,
    products: MOCK_ORDER_ITEMS
  }
];

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor() {}

  searchProducts(
    criteria: SearchCriteriaDto<OrderCriteriaDto>
  ): Observable<SearchResultDto<OrderDto>> {
    const products = ORDER_MOCK_DATA.filter(
      (order: OrderDto): boolean =>
        !criteria.criteria?.status || order.status === criteria.criteria.status
    );
    return of({
      results: products,
      total: products.length
    }).pipe(delay(1000));
  }

  getOrderById(id: string): OrderDto {
    return {
      id,
      name: 'Trần Thanh Tân',
      address: '...ận Bình Thạnh, TPHCM',
      phone: '033...1630',
      status: OrderStatus.PROCESSING,
      type: OrderType.SPECIAL,
      createdDate: new Date(),
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
        imageUrl: 'assets/flower-rose.png'
      } as OrderItemDto,
      {
        id: '2024020827709_134533_2',
        name: 'Vũ Điệu Tình Yêu',
        quantity: 1,
        detail: '22 bông hồng trắng',
        price: 1000000,
        imageUrl: 'assets/flower-love.png'
      } as OrderItemDto,
      {
        id: '2024020827709_134533_3',
        name: 'Nụ hôn Biển Cả ',
        quantity: 1,
        detail: '33 bông hồng xanh băng',
        price: 300000,
        imageUrl: 'assets/flower-ocean.png'
      } as OrderItemDto
    ];
  }
}
