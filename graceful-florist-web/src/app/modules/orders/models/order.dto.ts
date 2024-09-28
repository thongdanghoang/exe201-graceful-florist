import {ProductDto} from '../../products/models/product.dto';

export enum OrderStatus {
  PROCESSING = 'PROCESSING'
}

export enum OrderType {
  NORMAL = 'NORMAL',
  SPECIAL = 'SPECIAL'
}

export interface OrderDto {
  id: string;
  name: string;
  phone: string;
  address: string;
  createdDate: Date;
  status: OrderStatus;
  type: OrderType;
  products: OrderItemDto[];
  total: number;
  receivedDateTime: Date;
  message: string;
  note: string;
}

export interface OrderItemDto extends ProductDto {
  id: string;
  name: string;
  detail: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface OrderCriteriaDto {
  status: OrderStatus;
}
