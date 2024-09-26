import {SearchResultDto} from '../../shared/models/abstract-base-dto';

export interface ProductDto {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  category?: string;
  createdDate?: Date;
  status?: ProductStatus;
}

export enum ProductStatus {
  SELLING = 'SELLING',
  NOT_SELLING = 'NOT_SELLING'
}

export interface ProductDetailDto extends ProductDto {
  detail: string;
  reviewCount: number;
  purchaseCount: number;
  images: string[];
  ingredients: IngredientDto[];
  description: any;
  comments: SearchResultDto<CommentDto>;
}

export interface IngredientDto {
  id: string;
  name: string;
  image_url: string;
}

export interface CommentDto {
  id: string;
  content: string;
  rating: number;
  images: string[];
  address: string;
  createdDate: string;
  user: UserDto;
}

export interface CommentSearchCriteriaDto {
  productId: string;
}

export interface UserDto {
  id: string;
  name: string;
  avatar: string;
}

export interface ProductCriteriaDto {}
