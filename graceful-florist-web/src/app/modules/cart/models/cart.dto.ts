interface ProductDto {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export interface CartItemDto extends ProductDto {
  quantity: number;
}
