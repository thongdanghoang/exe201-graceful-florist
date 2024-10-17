import {ProductDto, UserDto} from '../../products/models/product.dto';
import {
  AbstractAuditableDTO,
  AbstractBaseDto
} from '../../shared/models/abstract-base-dto';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  DEPOSITED = 'DEPOSITED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  RATED = 'RATED'
}

export enum OrderType {
  NORMAL = 'NORMAL',
  SPECIAL = 'SPECIAL'
}

export interface OrderDto extends AbstractAuditableDTO {
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  status: OrderStatus;
  type: OrderType;
  orderItems: OrderItemDto[];
  totalPrice: number;
  message: string;
  deliveryDate: Date;
  deliveryTimeFrom: Date;
  deliveryTimeTo: Date;
  user: UserDto;
  staff: UserDto;
}

export interface OrderItemDto extends AbstractBaseDto {
  product: ProductDto;
  name: string;
  detail: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface OrderCriteriaDto {
  status?: OrderStatus;
  fromInclusive?: Date;
  orderType?: OrderType;
}
