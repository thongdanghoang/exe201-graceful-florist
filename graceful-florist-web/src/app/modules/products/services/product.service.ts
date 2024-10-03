import {Injectable} from '@angular/core';
import {
  CommentDto,
  CommentSearchCriteriaDto,
  ProductCriteriaDto,
  ProductDetailDto,
  ProductDto,
  ProductStatus
} from '../models/product.dto';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';
import {Observable, delay, map, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppRoutingConstants} from '../../../app-routing-constants';
import {uuid} from '../../../../../graceful-florist-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private readonly httpClient: HttpClient) {}

  getProductById(id: uuid): Observable<ProductDetailDto> {
    return this.httpClient
      .get<ProductDetailDto>(
        `${AppRoutingConstants.BACKEND_API_URL}/products/${id}`
      )
      .pipe(
        map((product: ProductDetailDto) => ({
          ...product,
          imageUrl: product.images.length
            ? `${AppRoutingConstants.BACKEND_API_URL}/images/${product.images[0]}`
            : '',
          images: product.images.length
            ? product.images
                .slice(1)
                .map(
                  image =>
                    `${AppRoutingConstants.BACKEND_API_URL}/images/${image}`
                )
            : []
        }))
      );
  }

  // eslint-disable-next-line max-lines-per-function
  getProductComment(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _criteria: SearchCriteriaDto<CommentSearchCriteriaDto>
  ): Observable<SearchResultDto<CommentDto>> {
    return of({
      results: [
        {
          id: '',
          rating: 5,
          content: 'Sản phẩm rất tốt',
          images: ['assets/063679905778.png'],
          address: 'Bình Thạnh, HCM',
          createdDate: '06/01/2024',
          user: {
            id: '',
            name: 'Mai Anh',
            avatar:
              'assets/421095852_789063679905778_600418982112123023_n_2.svg'
          }
        },
        {
          id: '',
          rating: 5,
          content: 'Sản phẩm rất tốt',
          images: ['assets/063679905778.png'],
          address: 'Bình Thạnh, HCM',
          createdDate: '06/01/2024',
          user: {
            id: '',
            name: 'Mai Anh',
            avatar:
              'assets/421095852_789063679905778_600418982112123023_n_2.svg'
          }
        },
        {
          id: '',
          rating: 5,
          content: 'Sản phẩm rất tốt',
          images: ['assets/063679905778.png'],
          address: 'Bình Thạnh, HCM',
          createdDate: '06/01/2024',
          user: {
            id: '',
            name: 'Mai Anh',
            avatar:
              'assets/421095852_789063679905778_600418982112123023_n_2.svg'
          }
        },
        {
          id: '',
          rating: 5,
          content: 'Sản phẩm rất tốt',
          images: ['assets/063679905778.png'],
          address: 'Bình Thạnh, HCM',
          createdDate: '06/01/2024',
          user: {
            id: '',
            name: 'Mai Anh',
            avatar:
              'assets/421095852_789063679905778_600418982112123023_n_2.svg'
          }
        },
        {
          id: '',
          rating: 5,
          content: 'Sản phẩm rất tốt',
          images: ['assets/063679905778.png'],
          address: 'Bình Thạnh, HCM',
          createdDate: '06/01/2024',
          user: {
            id: '',
            name: 'Mai Anh',
            avatar:
              'assets/421095852_789063679905778_600418982112123023_n_2.svg'
          }
        },
        {
          id: '',
          rating: 5,
          content: 'Sản phẩm rất tốt',
          images: ['assets/063679905778.png'],
          address: 'Bình Thạnh, HCM',
          createdDate: '06/01/2024',
          user: {
            id: '',
            name: 'Mai Anh',
            avatar:
              'assets/421095852_789063679905778_600418982112123023_n_2.svg'
          }
        },
        {
          id: '',
          rating: 5,
          content: 'Sản phẩm rất tốt',
          images: ['assets/063679905778.png'],
          address: 'Bình Thạnh, HCM',
          createdDate: '06/01/2024',
          user: {
            id: '',
            name: 'Mai Anh',
            avatar:
              'assets/421095852_789063679905778_600418982112123023_n_2.svg'
          }
        },
        {
          id: '',
          rating: 5,
          content: 'Sản phẩm rất tốt',
          images: ['assets/063679905778.png'],
          address: 'Bình Thạnh, HCM',
          createdDate: '06/01/2024',
          user: {
            id: '',
            name: 'Mai Anh',
            avatar:
              'assets/421095852_789063679905778_600418982112123023_n_2.svg'
          }
        },
        {
          id: '',
          rating: 5,
          content: 'Sản phẩm rất tốt',
          images: ['assets/063679905778.png'],
          address: 'Bình Thạnh, HCM',
          createdDate: '06/01/2024',
          user: {
            id: '',
            name: 'Mai Anh',
            avatar:
              'assets/421095852_789063679905778_600418982112123023_n_2.svg'
          }
        }
      ],
      total: 9
    }).pipe(delay(1000));
  }

  searchProducts(
    criteria: SearchCriteriaDto<ProductCriteriaDto>
  ): Observable<SearchResultDto<ProductDto>> {
    // eslint-disable-next-line no-console
    console.debug(criteria);
    return this.httpClient
      .get<
        SearchResultDto<ProductDto>
      >(`${AppRoutingConstants.BACKEND_API_URL}/products`)
      .pipe(
        map((result: SearchResultDto<ProductDto>) => {
          result.results = result.results.map(product => ({
            ...product,
            imageUrl: product.images.length
              ? `${AppRoutingConstants.BACKEND_API_URL}/images/${product.images[0]}`
              : '',
            images: product.images.length
              ? product.images
                  .slice(1)
                  .map(
                    image =>
                      `${AppRoutingConstants.BACKEND_API_URL}/images/${image}`
                  )
              : []
          }));
          return result;
        })
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
    return this.searchProducts({
      sort: {column: 'createdDate', direction: 'desc'},
      page: {offset: 0, limit: 5},
      criteria: {status: ProductStatus.SELLING}
    }).pipe(
      map((result: SearchResultDto<ProductDto>): ProductDto[] =>
        result.results.filter(product => product.enabled)
      )
    );
  }
}
