import {Component, Injector, OnInit, inject} from '@angular/core';
import {FormDialogOptions} from '../../../shared/services/modal.service';
import {AbstractModalFormComponent} from '../../../shared/components/modal/abstract-modal-form.component';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import {
  ProductDetailDto,
  ProductStatus
} from '../../../products/models/product.dto';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {ProductService} from '../../../products/services/product.service';
import {uuid} from '../../../../../../graceful-florist-type';
import {catchError} from 'rxjs';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {CategoryService} from '../../services/category.service';
import {CategoryDto} from '../../model/category.dto';

export interface BasicModalOptions extends FormDialogOptions<ProductDetailDto> {
  title: string;
  body?: string;
  bodyTranslateParams?: any;
  detail?: string;
  primaryBtn?: string;
  hidePrimary?: boolean;
  secondaryBtn?: string;
  hideSecondary?: boolean;
  primaryBtnClass?: string;
  multiLine?: boolean;
}

@Component({
  selector: 'graceful-florist-create-product-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrl: './product-detail-modal.component.css'
})
export class ProductDetailModalComponent
  extends AbstractModalFormComponent<ProductDetailDto>
  implements OnInit
{
  createProductFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    version: this.formBuilder.control(0),
    name: this.formBuilder.control(null, [Validators.required]),
    description: this.formBuilder.control(null),
    price: this.formBuilder.control(null, [
      Validators.required,
      Validators.min(1000)
    ]),
    categories: this.formBuilder.control(null, [Validators.required]),
    ingredients: this.formBuilder.control(null),
    enabled: this.formBuilder.control(false),
    imageUrl: this.formBuilder.control(null, [Validators.required]),
    images: this.formBuilder.control([])
  };
  allCategories: CategoryDto[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly allowAddCategory: boolean = false;
  readonly allowAddIngredient: boolean = false;
  readonly allIngredients: string[] = [
    'Hoa Khai Trương',
    'Hoa hồng',
    'Hoa ly',
    'Hoa lan',
    'Hoa cúc'
  ];
  readonly productService: ProductService = inject(ProductService);
  readonly categoryService: CategoryService = inject(CategoryService);

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.registerSubscription(
      this.categoryService
        .getEnabledCategories()
        .subscribe(categories => (this.allCategories = categories))
    );
  }

  protected onMainImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.registerSubscription(
        this.productService
          .uploadImage(input.files[0])
          .pipe(
            catchError(error => {
              alert(`Upload image failed${JSON.stringify(error)}`);
              return [];
            })
          )
          .subscribe((id: uuid) => {
            this.formGroup
              .get('imageUrl')
              ?.setValue(`${AppRoutingConstants.BACKEND_API_URL}/images/${id}`);
          })
      );
    }
  }

  protected onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.registerSubscription(
        this.productService
          .uploadImage(input.files[0])
          .pipe(
            catchError(error => {
              alert(`Upload image failed${JSON.stringify(error)}`);
              return [];
            })
          )
          .subscribe((id: uuid) => {
            this.formGroup
              .get('images')
              ?.setValue([
                ...(this.formGroup.get('images')?.value || []),
                `${AppRoutingConstants.BACKEND_API_URL}/images/${id}`
              ]);
          })
      );
    }
  }

  protected override initDefaultData(): ProductDetailDto {
    return {} as ProductDetailDto;
  }

  protected override initializeData(): void {
    if (this.options?.data?.data.id) {
      this.registerSubscription(
        this.productService.getProductById(this.options.data.data.id).subscribe(
          (product: ProductDetailDto): void => {
            this.data = product;
            this.formGroup.patchValue(product);
          },
          (): void => {
            this.initDefaultData();
          }
        )
      );
    }
    this.data = this.initDefaultData();
  }

  protected override onSubmitFormDataSuccess(result: any): void {
    this.formGroup.patchValue(result);
    this.close(result);
  }

  protected override prepareDataBeforeSubmit(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override showSaveSuccessNotification(result: any): void {}

  protected override showValidationErrorNotification(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override onSubmitFormRequestError(error: any): void {}

  protected override initializeFormControls(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.createProductFormControls;
  }

  protected override submitFormMethod(): string {
    return this.isEditMode ? 'PUT' : 'POST';
  }

  protected override getSubmitFormData(): any {
    const formSubmitData = this.formGroup?.value;
    formSubmitData.images = [
      ...(formSubmitData.images || []),
      formSubmitData.imageUrl
    ];
    formSubmitData.images = formSubmitData.images.map((image: string) =>
      image.replace(`${AppRoutingConstants.BACKEND_API_URL}/images/`, '')
    );
    return formSubmitData;
  }

  protected override initializeFormValidation(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    control: AbstractControl<any, any>
  ): ValidationErrors | null {
    return null;
  }

  protected override validateForm(): string[] {
    return [];
  }

  protected get filteredCategories(): CategoryDto[] {
    const selectedCategories = this.formGroup.get('categories')?.value || [];
    return this.allCategories.filter(
      category =>
        !selectedCategories.some(
          (selected: CategoryDto) => selected.id === category.id
        )
    );
  }

  protected onSelectedCategory(event: MatAutocompleteSelectedEvent): void {
    const selectedCategory = this.allCategories.find(
      category => category.name === event.option.viewValue
    );
    if (selectedCategory) {
      const categories = this.formGroup.get('categories')?.value || [];
      this.formGroup
        .get('categories')
        ?.setValue([...categories, selectedCategory]);
    }
    event.option.deselect();
  }

  protected removeCategory(category: CategoryDto): void {
    const categories = this.formGroup.get('categories')?.value || [];
    const index = categories.findIndex(
      (cat: CategoryDto) => cat.id === category.id
    );

    if (index >= 0) {
      categories.splice(index, 1);
      this.formGroup.get('categories')?.setValue(categories);
    }
  }

  protected get productStatusValue(): ProductStatus {
    return this.formGroup.get('enabled')?.value
      ? ProductStatus.SELLING
      : ProductStatus.NOT_SELLING;
  }

  protected onAddCategory(event: MatChipInputEvent): void {
    if (!this.allowAddCategory) {
      return;
    }
    const value = (event.value || '').trim();
    if (value) {
      const categories = this.formGroup.get('categories')?.value || [];
      this.formGroup.get('categories')?.setValue([...categories, value]);
    }
    event.chipInput.clear();
  }

  protected get filteredIngredients(): string[] {
    const ingredients = this.formGroup.get('ingredients')?.value || [];
    return this.allIngredients.filter(
      ingredient => !ingredients.includes(ingredient)
    );
  }

  protected get isEditMode(): boolean {
    return !!this.options?.data?.data.id;
  }

  protected onAddIngredient(event: MatChipInputEvent): void {
    if (!this.allowAddIngredient) {
      return;
    }
    const value = (event.value || '').trim();
    if (value) {
      const ingredients = this.formGroup.get('ingredients')?.value || [];
      this.formGroup.get('ingredients')?.setValue([...ingredients, value]);
    }
    event.chipInput.clear();
  }

  protected onSelectedIngredient(event: MatAutocompleteSelectedEvent): void {
    const ingredients = this.formGroup.get('ingredients')?.value || [];
    this.formGroup
      .get('ingredients')
      ?.setValue([...ingredients, event.option.viewValue]);
    event.option.deselect();
  }

  protected removeIngredient(ingredient: string): void {
    const ingredients = this.formGroup.get('ingredients')?.value || [];
    const index = ingredients.indexOf(ingredient);
    if (index >= 0) {
      ingredients.splice(index, 1);
      this.formGroup.get('ingredients')?.setValue(ingredients);
    }
  }
}
