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

@Component({
  selector: 'graceful-florist-products-management',
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.css'
})
export class ProductsManagementComponent implements OnInit {
  @ViewChild('productsTable') productsTable!: TableComponent<
    ProductCriteriaDto,
    ProductDto
  >;
  filterFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    dateType: this.formBuilder.control(null),
    optionalDate: this.formBuilder.control(null),
    enabled: this.formBuilder.control(null),
    categories: this.formBuilder.control(null)
  };

  filterFormGroups: FormGroup = this.formBuilder.group(this.filterFormControls);

  fetchProduct!: (
    criteria: SearchCriteriaDto<ProductCriteriaDto>
  ) => Observable<SearchResultDto<ProductDto>>;
  sort!: SortDto;
  criteria!: ProductCriteriaDto;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly modalService: ModalService,
    private readonly productService: ProductService
  ) {}

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
  }

  // It's seem mat-calendar is not work with reactive form
  onSelectedDateFilterChanged(value: any): void {
    this.filterFormGroups.get('optionalDate')?.setValue(value);
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
    const dateType = this.filterFormGroups.get('dateType')?.value;
    const optionalDate = this.filterFormGroups.get('optionalDate')?.value;

    if (!dateType) {
      return 'Ngày';
    } else if (dateType === 'optional' && optionalDate) {
      return optionalDate.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } else if (dateType === 'newest') {
      return 'Gần Nhất';
    } else if (dateType === 'oldest') {
      return 'Cũ nhất';
    }
    return 'Ngày';
  }

  get enabledFilterLabel(): ProductStatus {
    return this.filterFormGroups.get('enabled')?.value;
  }

  getEnabledFilterLabel(enabled: boolean): ProductStatus {
    return enabled ? ProductStatus.SELLING : ProductStatus.NOT_SELLING;
  }

  resetFilter(): void {
    this.filterFormGroups.reset();
  }
}
