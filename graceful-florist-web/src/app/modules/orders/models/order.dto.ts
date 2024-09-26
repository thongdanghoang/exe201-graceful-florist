import {ProductDto} from '../../products/models/product.dto';

export interface OrderDto {
  id: string;
  name: string;
  phone: string;
  address: string;
  status: string;
  total: number;
  products: OrderItemDto[];
}

export interface OrderItemDto extends ProductDto {
  id: string;
  name: string;
  detail: string;
  quantity: number;
  price: number;
  image_url: string;
}
