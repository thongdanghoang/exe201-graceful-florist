import {AbstractAuditableDTO} from '../../shared/models/abstract-base-dto';

export interface CategoryDto extends AbstractAuditableDTO {
  name: string;
  type: CategoryType;
  enabled: boolean;
}

export enum CategoryType {
  FLOWER = 'FLOWER',
  THEME = 'THEME',
  COLOR = 'COLOR'
}

export interface CategoryCriteriaDto {
  type?: CategoryType;
  enabled?: boolean;
}
