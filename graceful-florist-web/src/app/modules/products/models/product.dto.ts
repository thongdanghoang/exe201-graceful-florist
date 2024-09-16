export interface ProductDto {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export interface ProductDetailDto extends ProductDto {
  detail: string;
  quantity: number;
}

export interface ProductCriteriaDto {}
