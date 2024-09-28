import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalService} from '../../../shared/services/modal.service';
import {ProductService} from '../../../products/services/product.service';
import {
  ProductCriteriaDto,
  ProductDto,
  ProductStatus
} from '../../../products/models/product.dto';
import {MatChipSelectionChange} from '@angular/material/chips';
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

@Component({
  selector: 'graceful-florist-products-management',
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.css'
})
export class ProductsManagementComponent implements OnInit {
  fetchProduct!: (
    criteria: SearchCriteriaDto<ProductCriteriaDto>
  ) => Observable<SearchResultDto<ProductDto>>;
  sort!: SortDto;
  criteria!: ProductCriteriaDto;

  selectedOption: string = '';
  selectedDateFilter: Date | undefined;
  selectedProductStatusFilter: ProductStatus | undefined;
  constructor(
    private readonly router: Router,
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

  onOptionChange(value: string): void {
    this.selectedOption = value;
  }

  onProductStatusFilterChanged(status: MatChipSelectionChange): void {
    this.selectedProductStatusFilter = status.source.id as ProductStatus;
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
}
