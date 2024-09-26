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

const PRODUCT_MOCK_DATA: ProductDto[] = [
  {
    id: '519ec05c-f15f-4c23-bba6-80517d74d6f8',
    name: 'Dịu Dàng Yêu Thương',
    price: 900000,
    imageUrl: 'assets/diu-dang-yeu-thuong.png',
    createdDate: new Date(),
    status: ProductStatus.SELLING
  },
  {
    id: 'b57388b3-f292-416c-8a8a-3e87bbca319f',
    name: 'Vẻ đẹp Vĩnh Cửu',
    price: 260000,
    imageUrl: 'assets/ve-dep-vinh-cuu.png',
    createdDate: new Date(),
    status: ProductStatus.SELLING
  },
  {
    id: '9a30f6c2-13fc-4ef5-9df1-98311b8ff512',
    name: 'Chung Thủy Vĩnh Viễn',
    price: 350000,
    imageUrl: 'assets/chung-thuy-vinh-vien.png',
    createdDate: new Date(),
    status: ProductStatus.SELLING
  },
  {
    id: '217a1ae6-79e2-4bb8-abb4-d7c2fcd2f50f',
    name: 'Nụ hôn Nồng Nàn',
    price: 600000,
    imageUrl: 'assets/nu-hon-nong-nan.png',
    createdDate: new Date(),
    status: ProductStatus.SELLING
  },
  {
    id: 'f4f19141-dfb4-4e60-9bc0-ed6709d32689',
    name: 'Lời Thì Thầm của Trái Tim',
    price: 600000,
    imageUrl: 'assets/loi-thi-tham-cua-trai-tim.png',
    createdDate: new Date(),
    status: ProductStatus.SELLING
  },
  {
    id: 'c4de1603-1cb8-4dec-abab-44727f0dd1b8',
    name: 'Hoa ly trắng',
    price: 300000,
    imageUrl: 'assets/hoa_ly_trang.jpg',
    createdDate: new Date(),
    status: ProductStatus.NOT_SELLING
  },
  {
    id: 'e57ee88d-f949-410a-8125-aaa92099328a',
    name: 'Hoa lan tím',
    price: 400000,
    imageUrl: 'assets/ve-dep-cua-bo-lan-tim.jpg',
    createdDate: new Date(),
    status: ProductStatus.NOT_SELLING
  },
  {
    id: '55661625-cf55-4648-a874-290cbfc96fa0',
    name: 'Hoa cúc vàng',
    price: 150000,
    imageUrl: 'assets/903_cuc-chum-vang-5.jpg',
    createdDate: new Date(),
    status: ProductStatus.NOT_SELLING
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() {}

  // eslint-disable-next-line max-lines-per-function
  getProductById(id: string): Observable<ProductDetailDto> {
    return of({
      id,
      name: 'Nụ hôn Nồng Nàn',
      price: 600000,
      imageUrl: 'assets/202204241048398304.png',
      detail: '33 Cánh Hoa Hồng',
      reviewCount: 593,
      purchaseCount: 40,
      images: [
        'assets/9012578.png',
        'assets/9012579.png',
        'assets/202204241048463654.png',
        'assets/202204241048532027.png',
        'assets/9012578.png',
        'assets/9012579.png',
        'assets/202204241048463654.png',
        'assets/202204241048532027.png'
      ],
      description:
        'Bó hoa được kết từ những bông hoa tươi mới nhất, đảm bảo chất lượng cao.\n' +
        'Thiết kế tinh tế, sang trọng, phù hợp với mọi không gian.\n' +
        'Mang ý nghĩa sâu sắc về tình yêu nồng nàn và say đắm.\n' +
        'Là món quà hoàn hảo để dành tặng cho người ấy.',
      ingredients: [
        {
          id: '',
          name: 'Hoa Hồng Đỏ',
          imageUrl: 'assets/hoa-hong-do.png'
        },
        {
          id: '',
          name: 'Lá Eucalyptus',
          imageUrl: 'assets/Eucalyptus.png'
        },
        {
          id: '',
          name: 'Hoa Baby Trắng',
          imageUrl: 'assets/hoa-baby-trang.png'
        }
      ],
      comments: {results: [], total: 0}
    } as ProductDetailDto).pipe(delay(1000));
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
    const products = PRODUCT_MOCK_DATA.filter(
      (product: ProductDto): boolean =>
        !criteria.criteria?.status ||
        product.status === criteria.criteria.status
    );
    return of({
      results: products,
      total: products.length
    }).pipe(delay(1000));
  }

  getRecommendedProducts(): Observable<ProductDto[]> {
    return this.searchProducts({
      sort: {column: 'createdDate', direction: 'desc'},
      page: {offset: 0, limit: 5},
      criteria: {status: ProductStatus.SELLING}
    }).pipe(
      map((result: SearchResultDto<ProductDto>): ProductDto[] => result.results)
    );
  }
}
