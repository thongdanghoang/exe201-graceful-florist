import {Injectable} from '@angular/core';
import {
  ProductCriteriaDto,
  ProductDetailDto,
  ProductDto
} from '../models/product.dto';
import {HttpClient} from '@angular/common/http';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../shared/models/abstract-base-dto';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private readonly _httpClient: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getProductById(_id: string): Observable<ProductDetailDto> {
    return of({} as ProductDetailDto);
  }

  // eslint-disable-next-line max-lines-per-function
  searchProducts(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _criteria: SearchCriteriaDto<ProductCriteriaDto>
  ): Observable<SearchResultDto<ProductDto>> {
    return of({
      results: [
        {
          id: '',
          name: 'Dịu Dàng Yêu Thương',
          price: 900000,
          image_url: 'assets/diu-dang-yeu-thuong.png'
        },
        {
          id: '',
          name: 'Vẻ đẹp Vĩnh Cửu',
          price: 260000,
          image_url: 'assets/ve-dep-vinh-cuu.png'
        },
        {
          id: '',
          name: 'Chung Thủy Vĩnh Viễn',
          price: 350000,
          image_url: 'assets/chung-thuy-vinh-vien.png'
        },
        {
          id: '',
          name: 'Nụ hôn Nồng Nàn',
          price: 600000,
          image_url: 'assets/nu-hon-nong-nan.png'
        },
        {
          id: '',
          name: 'Lời Thì Thầm của Trái Tim',
          price: 600000,
          image_url: 'assets/loi-thi-tham-cua-trai-tim.png'
        },
        {
          id: '',
          name: 'Vũ Điệu Tình Yêu',
          price: 800000,
          image_url: 'assets/vu-dieu-tinh-yeu.png'
        },
        {
          id: '',
          name: 'Dịu Dàng Yêu Thương',
          price: 900000,
          image_url: 'assets/diu-dang-yeu-thuong.png'
        },
        {
          id: '',
          name: 'Vẻ đẹp Vĩnh Cửu',
          price: 260000,
          image_url: 'assets/ve-dep-vinh-cuu.png'
        },
        {
          id: '',
          name: 'Chung Thủy Vĩnh Viễn',
          price: 350000,
          image_url: 'assets/chung-thuy-vinh-vien.png'
        },
        {
          id: '',
          name: 'Nụ hôn Nồng Nàn',
          price: 600000,
          image_url: 'assets/nu-hon-nong-nan.png'
        },
        {
          id: '',
          name: 'Lời Thì Thầm của Trái Tim',
          price: 600000,
          image_url: 'assets/loi-thi-tham-cua-trai-tim.png'
        },
        {
          id: '',
          name: 'Vũ Điệu Tình Yêu',
          price: 800000,
          image_url: 'assets/vu-dieu-tinh-yeu.png'
        },
        {
          id: '',
          name: 'Dịu Dàng Yêu Thương',
          price: 900000,
          image_url: 'assets/diu-dang-yeu-thuong.png'
        },
        {
          id: '',
          name: 'Vẻ đẹp Vĩnh Cửu',
          price: 260000,
          image_url: 'assets/ve-dep-vinh-cuu.png'
        },
        {
          id: '',
          name: 'Chung Thủy Vĩnh Viễn',
          price: 350000,
          image_url: 'assets/chung-thuy-vinh-vien.png'
        },
        {
          id: '',
          name: 'Nụ hôn Nồng Nàn',
          price: 600000,
          image_url: 'assets/nu-hon-nong-nan.png'
        },
        {
          id: '',
          name: 'Lời Thì Thầm của Trái Tim',
          price: 600000,
          image_url: 'assets/loi-thi-tham-cua-trai-tim.png'
        },
        {
          id: '',
          name: 'Vũ Điệu Tình Yêu',
          price: 800000,
          image_url: 'assets/vu-dieu-tinh-yeu.png'
        }
      ],
      total: 18
    });
  }
}
