import {Injectable} from '@angular/core';
import {Observable, delay, of} from 'rxjs';
import {CategoryCriteriaDto, CategoryDto} from '../model/category.dto';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';
import {HttpClient} from '@angular/common/http';
import {AppRoutingConstants} from '../../../app-routing-constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private readonly httpClient: HttpClient) {}

  searchCategories(
    searchCriteriaDto: SearchCriteriaDto<CategoryCriteriaDto>
  ): Observable<SearchResultDto<CategoryDto>> {
    return this.httpClient.post<SearchResultDto<CategoryDto>>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.CATEGORY_PATH}/search`,
      searchCriteriaDto
    );
  }

  getEnabledCategories(): Observable<CategoryDto[]> {
    return this.httpClient.get<CategoryDto[]>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.CATEGORY_PATH}`
    );
  }

  getCategory(id: string): Observable<CategoryDto> {
    return this.httpClient.get<CategoryDto>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.CATEGORY_PATH}/${id}`
    );
  }

  createCategory(category: CategoryDto): Observable<void> {
    if (category) {
      return of().pipe(delay(1000));
    }
    throw new Error('Invalid category');
  }
}
