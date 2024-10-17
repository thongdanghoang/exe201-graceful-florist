import {Injectable} from '@angular/core';
import {
  CommentDto,
  CommentSearchCriteriaDto,
  IngredientDto,
  ProductCriteriaDto,
  ProductCustomDTO,
  ProductCustomPriceDto,
  ProductDetailDto,
  ProductDto
} from '../models/product.dto';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';
import {Observable, map} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppRoutingConstants} from '../../../app-routing-constants';
import {uuid} from '../../../../../graceful-florist-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private readonly httpClient: HttpClient) {}

  addCustomProduct(product: ProductCustomDTO): Observable<ProductDto> {
    return this.httpClient.post<ProductDto>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.PRODUCTS_PATH}/custom`,
      product
    );
  }

  getProductById(id: uuid): Observable<ProductDetailDto> {
    return this.httpClient.get<ProductDetailDto>(
      `${AppRoutingConstants.BACKEND_API_URL}/products/${id}`
    );
  }

  searchProducts(
    criteria: SearchCriteriaDto<ProductCriteriaDto>
  ): Observable<SearchResultDto<ProductDto>> {
    return this.httpClient.post<SearchResultDto<ProductDto>>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.PRODUCTS_PATH}/search`,
      criteria
    );
  }

  getProductComment(
    criteria: SearchCriteriaDto<CommentSearchCriteriaDto>
  ): Observable<SearchResultDto<CommentDto>> {
    return this.httpClient.post<SearchResultDto<CommentDto>>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.PRODUCTS_PATH}/comments/search`,
      criteria
    );
  }

  uploadImage(image: File): Observable<uuid> {
    const formData = new FormData();
    formData.append('file', image);
    return this.httpClient
      .post<any>(`${AppRoutingConstants.BACKEND_API_URL}/images`, formData)
      .pipe(map((result: {id: uuid}) => result.id));
  }

  getRecommendedProducts(): Observable<ProductDto[]> {
    // TODO: should be have separate endpoint for recommended products
    return this.searchProducts({
      sort: {column: 'createdDate', direction: 'desc'},
      page: {pageNumber: 0, pageSize: 5},
      criteria: {categories: []}
    }).pipe(
      map((result: SearchResultDto<ProductDto>): ProductDto[] =>
        result.results.filter(product => product.enabled)
      )
    );
  }

  getIngredients(): Observable<IngredientDto[]> {
    return this.httpClient.get<IngredientDto[]>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.INGREDIENTS_PATH}`
    );
  }

  getCustomPrices(): Observable<ProductCustomPriceDto[]> {
    return this.httpClient.get<ProductCustomPriceDto[]>(
      `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.PRODUCTS_PATH}/custom-prices`
    );
  }
}
