import {Injectable} from '@angular/core';
import {
  CommentDto,
  CommentSearchCriteriaDto,
  ProductCriteriaDto,
  ProductDetailDto,
  ProductDto
} from '../models/product.dto';
import {HttpClient} from '@angular/common/http';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';
import {Observable, delay, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private readonly _httpClient: HttpClient) {}

  // eslint-disable-next-line max-lines-per-function
  getProductById(id: string): Observable<ProductDetailDto> {
    return of({
      id,
      name: 'Nụ hôn Nồng Nàn',
      price: 600000,
      image_url: 'assets/202204241048398304.png',
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
          image_url: 'assets/hoa-hong-do.png'
        },
        {
          id: '',
          name: 'Lá Eucalyptus',
          image_url: 'assets/Eucalyptus.png'
        },
        {
          id: '',
          name: 'Hoa Baby Trắng',
          image_url: 'assets/hoa-baby-trang.png'
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

  // eslint-disable-next-line max-lines-per-function
  searchProducts(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _criteria: SearchCriteriaDto<ProductCriteriaDto>
  ): Observable<SearchResultDto<ProductDto>> {
    return of({
      results: [
        {
          id: '519ec05c-f15f-4c23-bba6-80517d74d6f8',
          name: 'Dịu Dàng Yêu Thương',
          price: 900000,
          image_url: 'assets/diu-dang-yeu-thuong.png'
        },
        {
          id: 'b57388b3-f292-416c-8a8a-3e87bbca319f',
          name: 'Vẻ đẹp Vĩnh Cửu',
          price: 260000,
          image_url: 'assets/ve-dep-vinh-cuu.png'
        },
        {
          id: '9a30f6c2-13fc-4ef5-9df1-98311b8ff512',
          name: 'Chung Thủy Vĩnh Viễn',
          price: 350000,
          image_url: 'assets/chung-thuy-vinh-vien.png'
        },
        {
          id: '217a1ae6-79e2-4bb8-abb4-d7c2fcd2f50f',
          name: 'Nụ hôn Nồng Nàn',
          price: 600000,
          image_url: 'assets/nu-hon-nong-nan.png'
        },
        {
          id: 'f4f19141-dfb4-4e60-9bc0-ed6709d32689',
          name: 'Lời Thì Thầm của Trái Tim',
          price: 600000,
          image_url: 'assets/loi-thi-tham-cua-trai-tim.png'
        },
        {
          id: '47219dcb-5b80-48d8-813d-151133612109',
          name: 'Vũ Điệu Tình Yêu',
          price: 800000,
          image_url: 'assets/vu-dieu-tinh-yeu.png'
        },
        {
          id: 'cd4fe003-1374-4db4-9d77-93a90e8b824e',
          name: 'Dịu Dàng Yêu Thương',
          price: 900000,
          image_url: 'assets/diu-dang-yeu-thuong.png'
        },
        {
          id: 'ff062730-af01-4e53-ac07-d38093778743',
          name: 'Vẻ đẹp Vĩnh Cửu',
          price: 260000,
          image_url: 'assets/ve-dep-vinh-cuu.png'
        },
        {
          id: 'd4c5aa6d-3f7b-41f9-9ea7-b42b246056d2',
          name: 'Chung Thủy Vĩnh Viễn',
          price: 350000,
          image_url: 'assets/chung-thuy-vinh-vien.png'
        },
        {
          id: '708d6cd6-b151-4fac-a38d-f767321c988a',
          name: 'Nụ hôn Nồng Nàn',
          price: 600000,
          image_url: 'assets/nu-hon-nong-nan.png'
        },
        {
          id: '490905c0-76a4-4a69-bc83-ac28f7469037',
          name: 'Lời Thì Thầm của Trái Tim',
          price: 600000,
          image_url: 'assets/loi-thi-tham-cua-trai-tim.png'
        },
        {
          id: 'd18cbfac-a999-4b91-9d86-1f24e4dee272',
          name: 'Vũ Điệu Tình Yêu',
          price: 800000,
          image_url: 'assets/vu-dieu-tinh-yeu.png'
        },
        {
          id: '43865ba4-74a3-4216-89ca-e0e8d1cb71c5',
          name: 'Dịu Dàng Yêu Thương',
          price: 900000,
          image_url: 'assets/diu-dang-yeu-thuong.png'
        },
        {
          id: 'f1a2c8a8-278b-4c69-86c3-bff6b8ac8c41',
          name: 'Vẻ đẹp Vĩnh Cửu',
          price: 260000,
          image_url: 'assets/ve-dep-vinh-cuu.png'
        },
        {
          id: 'ef0a45fa-2e91-4f57-9e3d-cf838408b9d0',
          name: 'Chung Thủy Vĩnh Viễn',
          price: 350000,
          image_url: 'assets/chung-thuy-vinh-vien.png'
        },
        {
          id: 'b8eb98f2-9d7c-4d7b-a93d-7145dc42fde9',
          name: 'Nụ hôn Nồng Nàn',
          price: 600000,
          image_url: 'assets/nu-hon-nong-nan.png'
        },
        {
          id: '28654c2c-dbdc-4792-9e9e-f1b59de1bdf4',
          name: 'Lời Thì Thầm của Trái Tim',
          price: 600000,
          image_url: 'assets/loi-thi-tham-cua-trai-tim.png'
        },
        {
          id: 'aad33395-9010-4f3c-8f23-05821d1b33d7',
          name: 'Vũ Điệu Tình Yêu',
          price: 800000,
          image_url: 'assets/vu-dieu-tinh-yeu.png'
        }
      ],
      total: 18
    }).pipe(delay(1000));
  }

  // eslint-disable-next-line max-lines-per-function
  getRecommendedProducts(): Observable<ProductDto[]> {
    return of([
      {
        id: '519ec05c-f15f-4c23-bba6-80517d74d6f8',
        name: 'Dịu Dàng Yêu Thương',
        price: 900000,
        image_url: 'assets/diu-dang-yeu-thuong.png'
      },
      {
        id: 'b57388b3-f292-416c-8a8a-3e87bbca319f',
        name: 'Vẻ đẹp Vĩnh Cửu',
        price: 260000,
        image_url: 'assets/ve-dep-vinh-cuu.png'
      },
      {
        id: '9a30f6c2-13fc-4ef5-9df1-98311b8ff512',
        name: 'Chung Thủy Vĩnh Viễn',
        price: 350000,
        image_url: 'assets/chung-thuy-vinh-vien.png'
      },
      {
        id: '217a1ae6-79e2-4bb8-abb4-d7c2fcd2f50f',
        name: 'Nụ hôn Nồng Nàn',
        price: 600000,
        image_url: 'assets/nu-hon-nong-nan.png'
      }
    ]).pipe(delay(1000));
  }
}
