import {Component, OnInit, signal} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {PageEvent} from '@angular/material/paginator';
import {
  SearchCriteriaDto,
  SearchResultDto
} from '../../../shared/models/abstract-base-dto';
import {ProductCriteriaDto, ProductDto} from '../../models/product.dto';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {BreadcrumbItem} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {Router} from '@angular/router';

@Component({
  selector: 'graceful-florist-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  protected criteria: SearchCriteriaDto<ProductCriteriaDto>;
  protected results: SearchResultDto<ProductDto>;
  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Sản Phẩm', path: AppRoutingConstants.DEV_PATH}
  ];
  protected readonly panelOpenState = signal(false);
  protected readonly flowersByTheme: string[] = [
    'Hoa cho cặp đôi',
    'Hoa Xin Lỗi',
    'Hoa Sinh Nhật',
    'Hoa Chúc Mừng',
    'Hoa kỷ niệm ngày cưới',
    'Hoa chia buồn'
  ];
  protected readonly decorators: string[] = [
    'Giỏ hoa để bàn',
    'Bó hoa',
    'Bình hoa',
    'Giỏ hoa',
    'Trái cây',
    'Hộp hoa'
  ];
  protected readonly selectedFilters: string[] = ['Hoa cho cặp đôi'];

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) {
    super();
    this.criteria = {
      page: {
        limit: 12,
        offset: 0
      },
      sort: {
        column: 'name',
        direction: 'asc'
      },
      criteria: {} as ProductCriteriaDto
    };
    this.results = {
      results: [],
      total: 0
    };
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.productService
        .searchProducts(this.criteria)
        .subscribe((results: SearchResultDto<ProductDto>): void => {
          this.results = results;
        })
    );
  }

  onPageChange(pageEvent: PageEvent): void {
    this.criteria.page.limit = pageEvent.pageSize;
    this.criteria.page.offset = pageEvent.pageIndex * this.criteria.page.limit;
    this.productService.searchProducts(this.criteria).subscribe();
  }

  onProductClick(product: ProductDto): void {
    void this.router.navigate([
      `${AppRoutingConstants.PRODUCTS_PATH}/${product.id}`
    ]);
  }
}
