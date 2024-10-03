import {
  AbstractAuditableDTO,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';

export interface ProductDto extends AbstractAuditableDTO {
  name: string;
  price: number;
  imageUrl?: string;
  images: string[];
  enabled: boolean;
  category?: string;
}

export enum ProductStatus {
  SELLING = 'SELLING',
  NOT_SELLING = 'NOT_SELLING'
}

export interface ProductDetailDto extends ProductDto {
  detail: string;
  reviewCount: number;
  purchaseCount: number;
  ingredients: IngredientDto[];
  description: any;
  comments: SearchResultDto<CommentDto>;
}

export interface IngredientDto {
  id: string;
  name: string;
  imageUrl: string;
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

export interface ProductCriteriaDto {
  status?: ProductStatus;
}
