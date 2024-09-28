import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalService} from '../../../shared/services/modal.service';
import {ProductService} from '../../../products/services/product.service';
import {
  ProductCriteriaDto,
  ProductDto,
  ProductStatus
} from '../../../products/models/product.dto';
import {
  BasicModalOptions,
  CreateProductModalComponent
} from '../create-product-modal/create-product-modal.component';
import {
  SearchCriteriaDto,
  SearchResultDto,
  SortDto
} from '../../../shared/models/abstract-base-dto';
import {Observable} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'graceful-florist-products-management',
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.css'
})
export class ProductsManagementComponent implements OnInit {
  filterFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    dateType: this.formBuilder.control(null),
    optionalDate: this.formBuilder.control(null),
    status: this.formBuilder.control(null),
    categories: this.formBuilder.control(null)
  };

  filterFormGroups: FormGroup = this.formBuilder.group(this.filterFormControls);
  selectedDateFilter: Date | undefined;

  fetchProduct!: (
    criteria: SearchCriteriaDto<ProductCriteriaDto>
  ) => Observable<SearchResultDto<ProductDto>>;
  sort!: SortDto;
  criteria!: ProductCriteriaDto;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly modalService: ModalService,
    private readonly productService: ProductService
  ) {}

  ngOnInit(): void {
    this.fetchProduct = this.productService.searchProducts.bind(
      this.productService
    );
    this.sort = {
      column: 'name',
      direction: 'asc'
    };
    this.criteria = {};
  }

  // It's seem mat-calendar is not work with reactive form
  onSelectedDateFilterChanged(value: any): void {
    this.filterFormGroups.get('optionalDate')?.setValue(value);
  }

  onAddProductClicked(): void {
    const options: BasicModalOptions = {
      title: 'Thêm sản phẩm'
    };
    void this.modalService.open(CreateProductModalComponent, options);
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

  get statusFilterLabel(): ProductStatus {
    return this.filterFormGroups.get('status')?.value;
  }

  resetFilter(): void {
    this.filterFormGroups.reset();
  }
}
