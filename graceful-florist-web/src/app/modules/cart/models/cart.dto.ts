import {ProductDto} from '../../products/models/product.dto';

export interface CartItemDto extends ProductDto {
  quantity: number;
}
