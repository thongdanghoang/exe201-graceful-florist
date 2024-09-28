import {Injectable} from '@angular/core';
import {Observable, delay, of} from 'rxjs';
import {
  CategoryCriteriaDto,
  CategoryDto,
  CategoryTypeDto
} from '../model/category.dto';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';

const MOCK_CATEGORIES: CategoryDto[] = [
  {
    id: '0192393c-565f-7338-ae70-83a29ab5d360',
    name: 'Hoa Hồng',
    type: CategoryTypeDto.FLOWER,
    enabled: true
  },
  {
    id: '0d053cb9-0ecb-4902-b8fa-f99f055d67eb',
    name: 'Hoa Khai Trương',
    type: CategoryTypeDto.THEME,
    enabled: true
  },
  {
    id: 'ac12ef9f-62c4-4541-a153-296f517ef805',
    name: 'Màu Đỏ',
    type: CategoryTypeDto.COLOR,
    enabled: true
  },
  {
    id: 'dc89e631-4ac5-4501-80e7-890d35a89ae4',
    name: 'Hoa Lan',
    type: CategoryTypeDto.FLOWER,
    enabled: true
  },
  {
    id: '35d10a6e-1fd7-41e6-a2c5-9d1881e9d71c',
    name: 'Hoa Cúc',
    type: CategoryTypeDto.FLOWER,
    enabled: true
  }
];

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor() {}

  searchCategories(
    searchCriteriaDto: SearchCriteriaDto<CategoryCriteriaDto>
  ): Observable<SearchResultDto<CategoryDto>> {
    let filtered: CategoryDto[] = MOCK_CATEGORIES;
    if (searchCriteriaDto?.criteria?.type) {
      filtered = filtered.filter(
        c => c.type === searchCriteriaDto.criteria.type
      );
    }
    if (searchCriteriaDto?.criteria?.enabled !== undefined) {
      filtered = filtered.filter(
        c => c.enabled === searchCriteriaDto.criteria.enabled
      );
    }
    return of({
      results: filtered,
      total: filtered.length
    }).pipe(delay(1000));
  }

  getCategory(id: string): Observable<CategoryDto> {
    const category = MOCK_CATEGORIES.find(c => c.id === id);
    if (category) {
      return of(category).pipe(delay(1000));
    }
    throw new Error('Category not found');
  }

  createCategory(category: CategoryDto): Observable<void> {
    if (category) {
      return of().pipe(delay(1000));
    }
    throw new Error('Invalid category');
  }
}
