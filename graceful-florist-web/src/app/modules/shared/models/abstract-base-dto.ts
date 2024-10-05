import {uuid} from '../../../../../graceful-florist-type';

export interface AbstractBaseDto {
  id: uuid;
  version: number;
}

export interface AbstractAuditableDTO extends AbstractBaseDto {
  createdBy?: string;
  createdDate?: Date;
  lastModifiedDate?: Date;
  lastModifiedBy?: string;
}

export interface SearchPageDto {
  pageNumber: number;
  pageSize: number;
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

export interface BusinessErrorParam {
  key: string;
  value: string;
}

export interface BusinessErrorResponse {
  correlationId: string;
  field: string;
  i18nKey: string;
  args: BusinessErrorParam[];
}
