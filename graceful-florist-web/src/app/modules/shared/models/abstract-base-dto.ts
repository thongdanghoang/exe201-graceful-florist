import {uuid} from '../../../../../graceful-florist-type';

export interface AbstractBaseDto {
  id: uuid;
  version: number;
}

export interface SearchPageDto {
  offset: number;
  limit: number;
}

export interface SortDto {
  column: string;
  direction: string;
}

export interface SearchCriteriaDto<C> {
  page: SearchPageDto;
  criteria: C;
  sort: SortDto;
}

export interface SearchResultDto<R> {
  results: R[];
  total: number;
}

export interface KeyValue {
  [key: string]: any;
}

export interface AutoCompleteDto<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface AutoCompleteSearchDto<T> {
  value: T;
  searchText: string;
}
