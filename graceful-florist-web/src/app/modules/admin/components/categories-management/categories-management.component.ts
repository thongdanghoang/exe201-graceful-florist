import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {ModalService} from '../../../shared/services/modal.service';
import {
  SearchCriteriaDto,
  SearchResultDto,
  SortDto
} from '../../../shared/models/abstract-base-dto';
import {Observable} from 'rxjs';
import {
  CategoryCriteriaDto,
  CategoryDto,
  CategoryType
} from '../../model/category.dto';
import {
  CategoryDetailModalComponent,
  CategoryModalOptions
} from '../category-detail-modal/category-detail-modal.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {TableComponent} from '../../../shared/components/table/table.component';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';

@Component({
  selector: 'graceful-florist-categories-management',
  templateUrl: './categories-management.component.html'
})
export class CategoriesManagementComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  filterFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    type: this.formBuilder.control(null),
    enabled: this.formBuilder.control(null)
  };
  filterFormGroups: FormGroup = this.formBuilder.group(this.filterFormControls);

  fetchCategories!: (
    criteria: SearchCriteriaDto<CategoryCriteriaDto>
  ) => Observable<SearchResultDto<CategoryDto>>;
  sort!: SortDto;
  criteria!: CategoryCriteriaDto;

  @ViewChild('categoriesTable') categoriesTable!: TableComponent<
    CategoryCriteriaDto,
    CategoryDto
  >;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly modalService: ModalService,
    private readonly categoryService: CategoryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchCategories = this.categoryService.searchCategories.bind(
      this.categoryService
    );
    this.sort = {
      column: 'lastModifiedDate',
      direction: 'asc'
    };
    this.criteria = {};
    this.registerSubscription(
      this.filterFormGroups.valueChanges.subscribe(value => {
        this.categoriesTable.searchCriteria.criteria = value;
        this.categoriesTable.search();
      })
    );
  }

  get typeValue(): CategoryType {
    return this.filterFormGroups.get('type')?.value;
  }

  get categoriesType(): CategoryType[] {
    return Object.values(CategoryType);
  }

  onAddCategoryClicked(): void {
    const options: CategoryModalOptions = {
      title: 'Tạo mới danh mục',
      data: {
        data: {} as CategoryDto,
        submitUrl: `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.CATEGORY_PATH}`
      }
    };
    void this.modalService
      .open(CategoryDetailModalComponent, options)
      .then((result: any): void => {
        if (result) {
          this.categoriesTable.submit();
        }
      });
  }

  openCategoryDetailModal(category: CategoryDto): void {
    // fetch category detail ?
    const options: CategoryModalOptions = {
      title: 'Sửa danh mục',
      data: {
        data: category,
        submitUrl: `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.CATEGORY_PATH}`
      }
    };
    void this.modalService
      .open(CategoryDetailModalComponent, options)
      .then((result: any): void => {
        if (result) {
          this.categoriesTable.submit();
        }
      });
  }

  resetFilter(): void {
    this.filterFormGroups.reset();
  }
}
