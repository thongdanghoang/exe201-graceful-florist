import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../../shared/services/modal.service';
import {ProductService} from '../../../products/services/product.service';
import {
  ProductCriteriaDto,
  ProductDetailDto,
  ProductDto,
  ProductStatus
} from '../../../products/models/product.dto';
import {
  BasicModalOptions,
  ProductDetailModalComponent
} from '../product-detail-modal/product-detail-modal.component';
import {
  SearchCriteriaDto,
  SearchResultDto,
  SortDto
} from '../../../shared/models/abstract-base-dto';
import {Observable} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {TableComponent} from '../../../shared/components/table/table.component';
import {CategoryType} from '../../model/category.dto';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';

@Component({
  selector: 'graceful-florist-products-management',
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.css'
})
export class ProductsManagementComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  @ViewChild('productsTable') productsTable!: TableComponent<
    ProductCriteriaDto,
    ProductDto
  >;
  filterFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    fromInclusive: this.formBuilder.control(null),
    status: this.formBuilder.control(null),
    categoryType: this.formBuilder.control(null)
  };

  filterFormGroups: FormGroup = this.formBuilder.group(this.filterFormControls);

  fetchProduct!: (
    criteria: SearchCriteriaDto<ProductCriteriaDto>
  ) => Observable<SearchResultDto<ProductDto>>;
  sort!: SortDto;
  criteria!: ProductCriteriaDto;

  protected readonly categories: CategoryType[] = Object.values(CategoryType);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly modalService: ModalService,
    private readonly productService: ProductService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchProduct = this.productService.searchProducts.bind(
      this.productService
    );
    this.sort = {
      column: 'lastModifiedDate',
      direction: 'desc'
    };
    this.criteria = {
      categories: []
    };
    this.registerSubscription(
      this.filterFormGroups.valueChanges.subscribe(value => {
        this.productsTable.searchCriteria.criteria = {
          ...this.criteria,
          ...value
        };
        this.productsTable.search();
      })
    );
  }

  // It's seem mat-calendar is not work with reactive form
  onSelectedDateFilterChanged(value: any): void {
    this.filterFormGroups.get('fromInclusive')?.setValue(value);
  }

  onAddProductClicked(): void {
    const options: BasicModalOptions = {
      title: 'Thêm sản phẩm',
      data: {
        data: {} as ProductDetailDto,
        submitUrl: `${AppRoutingConstants.BACKEND_API_URL}/products`
      }
    };
    void this.modalService
      .open(ProductDetailModalComponent, options)
      .then(result => {
        if (result) {
          this.productsTable.search();
        }
      });
  }

  openProductDetailModal(product: ProductDto): void {
    // fetch product detail ?
    const options: BasicModalOptions = {
      title: 'Sửa sản phẩm',
      data: {
        data: product as ProductDetailDto,
        submitUrl: `${AppRoutingConstants.BACKEND_API_URL}/products/${product.id}`
      }
    };
    void this.modalService
      .open(ProductDetailModalComponent, options)
      .then(result => {
        if (result) {
          this.productsTable.search();
        }
      });
  }

  get productStatus(): ProductStatus[] {
    return Object.values(ProductStatus);
  }

  get dateTypeFilterLabel(): string {
    const fromInclusive = this.filterFormGroups.get('fromInclusive')?.value;
    if (fromInclusive) {
      return fromInclusive.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
    return 'Ngày';
  }

  get enabledFilterLabel(): ProductStatus {
    return this.filterFormGroups.get('status')?.value;
  }

  get selectedCategory(): CategoryType {
    return this.filterFormGroups.get('categoryType')?.value;
  }

  getEnabledFilterLabel(status: boolean): ProductStatus {
    return status ? ProductStatus.SELLING : ProductStatus.NOT_SELLING;
  }

  resetFilter(): void {
    this.filterFormGroups.reset();
  }
}
