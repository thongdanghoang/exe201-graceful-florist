export interface CategoryDto {
  id: string;
  name: string;
  type: CategoryTypeDto;
  enabled: boolean;
}

export enum CategoryTypeDto {
  FLOWER = 'FLOWER',
  THEME = 'THEME',
  COLOR = 'COLOR'
}

export interface CategoryCriteriaDto {
  name?: string;
  type?: CategoryTypeDto;
  enabled?: boolean;
}
