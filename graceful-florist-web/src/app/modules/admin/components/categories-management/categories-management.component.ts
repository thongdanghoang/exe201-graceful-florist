import {Component, OnInit} from '@angular/core';
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
  CategoryTypeDto
} from '../../model/category.dto';
import {
  CategoryDetailModalComponent,
  CategoryModalOptions
} from '../category-detail-modal/category-detail-modal.component';

@Component({
  selector: 'graceful-florist-categories-management',
  templateUrl: './categories-management.component.html',
  styleUrl: './categories-management.component.css'
})
export class CategoriesManagementComponent implements OnInit {
  filterFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    name: this.formBuilder.control(null),
    type: this.formBuilder.control(null),
    enabled: this.formBuilder.control(null)
  };
  filterFormGroups: FormGroup = this.formBuilder.group(this.filterFormControls);

  fetchCategories!: (
    criteria: SearchCriteriaDto<CategoryCriteriaDto>
  ) => Observable<SearchResultDto<CategoryDto>>;
  sort!: SortDto;
  criteria!: CategoryCriteriaDto;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly modalService: ModalService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.fetchCategories = this.categoryService.searchCategories.bind(
      this.categoryService
    );
    this.sort = {
      column: 'name',
      direction: 'asc'
    };
    this.criteria = {};
  }

  get typeValue(): CategoryTypeDto {
    return this.filterFormGroups.get('type')?.value;
  }

  get categoriesType(): CategoryTypeDto[] {
    return Object.values(CategoryTypeDto);
  }

  onAddCategoryClicked(): void {
    const options = {
      title: 'Tạo mới danh mục'
    };
    void this.modalService.open(CategoryDetailModalComponent, options);
  }

  openCategoryDetailModal(category: CategoryDto): void {
    // fetch category detail ?
    const options: CategoryModalOptions = {
      title: 'Sửa danh mục',
      data: {
        data: category
      }
    };
    void this.modalService.open(CategoryDetailModalComponent, options);
  }

  resetFilter(): void {
    this.filterFormGroups.reset();
  }
}
