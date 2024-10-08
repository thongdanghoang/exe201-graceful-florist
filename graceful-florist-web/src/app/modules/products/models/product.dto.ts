import {
  AbstractAuditableDTO,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';
import {CategoryDto} from '../../admin/model/category.dto';
import {uuid} from '../../../../../graceful-florist-type';

export interface ProductDto extends AbstractAuditableDTO {
  name: string;
  price: number;
  mainImage: uuid;
  images: uuid[];
  enabled: boolean;
  description: string;
  owner?: UserDto;
}

export interface ProductCustomDTO {
  price: number;
  description: string;
  categories: CategoryDto[];
  ingredients: IngredientDto[];
}

export enum ProductStatus {
  SELLING = 'SELLING',
  NOT_SELLING = 'NOT_SELLING'
}

export interface ProductDetailDto extends ProductDto {
  reviewCount: number;
  purchaseCount: number;
  ingredients: IngredientDto[];
  description: any;
  comments: SearchResultDto<CommentDto>;
}

export interface IngredientDto {
  id: uuid;
  name: string;
  image: uuid;
  price: number;
  type: IngredientType;
  quantity?: number;
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
  categories: CategoryDto[];
}

export enum IngredientType {
  MAIN_FLOWER = 'MAIN_FLOWER',
  SECONDARY_FLOWER = 'SECONDARY_FLOWER',
  BACKGROUND_FLOWER = 'BACKGROUND_FLOWER',
  ACCESSORIES = 'ACCESSORIES',
  LAYOUT = 'LAYOUT',
  PACKAGING = 'PACKAGING'
}
