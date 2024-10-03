import {ProductDto} from '../../products/models/product.dto';

export interface CartItemDTO {
  product: ProductDto;
  quantity: number;
}
