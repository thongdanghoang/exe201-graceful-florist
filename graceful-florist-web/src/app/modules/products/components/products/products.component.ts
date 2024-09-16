import {Component, OnInit} from '@angular/core';
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

  constructor(private readonly productService: ProductService) {
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
}
