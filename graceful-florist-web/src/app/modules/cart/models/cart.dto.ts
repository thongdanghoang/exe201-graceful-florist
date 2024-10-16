import {ProductDetailDto} from '../../products/models/product.dto';

export interface CartItemDTO {
  product: ProductDetailDto;
  quantity: number;
}
