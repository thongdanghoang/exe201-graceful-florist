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
import {CategoryService} from '../../../admin/services/category.service';
import {CategoryDto, CategoryType} from '../../../admin/model/category.dto';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'graceful-florist-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  filterFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    selectedCategoryFlowers: this.formBuilder.control([]),
    selectedCategoryColors: this.formBuilder.control([]),
    selectedCategoryThemes: this.formBuilder.control([])
  };
  filterFormGroups: FormGroup = this.formBuilder.group(this.filterFormControls);

  protected criteria: SearchCriteriaDto<ProductCriteriaDto>;
  protected products: SearchResultDto<ProductDto> | undefined;
  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Sản Phẩm', path: AppRoutingConstants.DEV_PATH}
  ];
  protected readonly panelOpenState = signal(false);
  protected readonly categories: CategoryDto[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly router: Router
  ) {
    super();
    this.criteria = {
      page: {
        pageSize: 12,
        pageNumber: 0
      },
      sort: {
        column: 'name',
        direction: 'asc'
      },
      criteria: {categories: []}
    };
  }

  ngOnInit(): void {
    this.registerSubscriptions([
      this.search(),
      this.categoryService
        .getEnabledCategories()
        .subscribe((categories: CategoryDto[]): void => {
          this.categories.push(...categories);
        }),
      this.filterFormGroups.valueChanges.subscribe((value: any): void => {
        this.criteria.criteria.categories = [
          ...(Array.isArray(value.selectedCategoryFlowers)
            ? value.selectedCategoryFlowers
            : []),
          ...(Array.isArray(value.selectedCategoryColors)
            ? value.selectedCategoryColors
            : []),
          ...(Array.isArray(value.selectedCategoryThemes)
            ? value.selectedCategoryThemes
            : [])
        ];
        this.registerSubscription(this.search());
      })
    ]);
  }

  search(): Subscription {
    return this.productService
      .searchProducts(this.criteria)
      .subscribe((results: SearchResultDto<ProductDto>): void => {
        this.products = results;
      });
  }

  get categoryFlowers(): CategoryDto[] {
    return this.categories.filter(
      (category: CategoryDto): boolean => category.type === CategoryType.FLOWER
    );
  }

  get categoryColors(): CategoryDto[] {
    return this.categories.filter(
      (category: CategoryDto): boolean => category.type === CategoryType.COLOR
    );
  }

  get categoryThemes(): CategoryDto[] {
    return this.categories.filter(
      (category: CategoryDto): boolean => category.type === CategoryType.THEME
    );
  }

  get selectedFilters(): CategoryDto[] {
    return [
      ...(this.filterFormGroups.get('selectedCategoryFlowers')?.value ?? []),
      ...(this.filterFormGroups.get('selectedCategoryColors')?.value ?? []),
      ...(this.filterFormGroups.get('selectedCategoryThemes')?.value ?? [])
    ];
  }

  contain(formControlName: string, value: any): boolean {
    return (
      this.filterFormGroups.get(formControlName)?.value?.includes(value) ??
      false
    );
  }

  removeSelectedFilter(category: CategoryDto): void {
    this.filterFormGroups
      .get('selectedCategoryFlowers')
      ?.setValue(
        this.filterFormGroups
          .get('selectedCategoryFlowers')
          ?.value.filter(
            (selectedCategory: CategoryDto): boolean =>
              selectedCategory.id !== category.id
          )
      );
    this.filterFormGroups
      .get('selectedCategoryColors')
      ?.setValue(
        this.filterFormGroups
          .get('selectedCategoryColors')
          ?.value.filter(
            (selectedCategory: CategoryDto): boolean =>
              selectedCategory.id !== category.id
          )
      );
    this.filterFormGroups
      .get('selectedCategoryThemes')
      ?.setValue(
        this.filterFormGroups
          .get('selectedCategoryThemes')
          ?.value.filter(
            (selectedCategory: CategoryDto): boolean =>
              selectedCategory.id !== category.id
          )
      );
  }

  resetFilters(): void {
    this.filterFormGroups.reset();
  }

  generateRange(count: number): number[] {
    return Array.from({length: count}, (_, i) => i + 1);
  }

  onPageChange(pageEvent: PageEvent): void {
    this.criteria.page.pageSize = pageEvent.pageSize;
    this.criteria.page.pageNumber = pageEvent.pageIndex;
    this.search();
  }

  onSortChange(
    col: 'lastModifiedDate' | 'price' | 'purchases',
    direction: 'asc' | 'desc'
  ): void {
    this.criteria.sort.column = col;
    this.criteria.sort.direction = direction;
    this.search();
  }

  onProductClick(product: ProductDto): void {
    void this.router.navigate([
      `${AppRoutingConstants.PRODUCTS_PATH}/${product.id}`
    ]);
  }
}
