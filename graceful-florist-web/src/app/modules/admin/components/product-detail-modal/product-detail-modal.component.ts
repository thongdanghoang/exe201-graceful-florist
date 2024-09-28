import {Component, Injector} from '@angular/core';
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
export class ProductDetailModalComponent extends AbstractModalFormComponent<ProductDetailDto> {
  createProductFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    name: this.formBuilder.control(null, [Validators.required]),
    description: this.formBuilder.control(null),
    price: this.formBuilder.control(null, [
      Validators.required,
      Validators.min(1000)
    ]),
    categories: this.formBuilder.control(null, [Validators.required]),
    ingredients: this.formBuilder.control(null, [Validators.required]),
    isSelling: this.formBuilder.control(false),
    mainImage: this.formBuilder.control(null, [Validators.required]),
    images: this.formBuilder.control(null)
  };
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly allowAddCategory: boolean = false;
  readonly allowAddIngredient: boolean = false;
  readonly allCategories: string[] = [
    'Hoa Khai Trương',
    'Hoa hồng',
    'Hoa ly',
    'Hoa lan',
    'Hoa cúc'
  ];
  readonly allIngredients: string[] = [
    'Hoa Khai Trương',
    'Hoa hồng',
    'Hoa ly',
    'Hoa lan',
    'Hoa cúc'
  ];

  constructor(injector: Injector) {
    super(injector);
  }

  protected onMainImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // const file = input.files[0];
      // TODO: Upload image to server
      this.formGroup
        .get('mainImage')
        ?.setValue(
          'https://bloomsland.com.au/cdn/shop/articles/rose-meaning_b9a1bd31-488e-4961-8268-d8d109bb2f33.jpg?v=1717506684'
        );
    }
  }

  protected onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // const file = input.files[0];
      // TODO: Upload image to server
      const images = this.formGroup.get('images')?.value ?? [];
      this.formGroup
        .get('images')
        ?.setValue([
          ...images,
          'https://cms.interiorcompany.com/wp-content/uploads/2024/01/lincoln-red-rose-bush-types.jpg'
        ]);
    }
  }

  protected override initDefaultData(): ProductDetailDto {
    if (this.options.data?.data) {
      return this.options.data.data;
    }
    return {} as ProductDetailDto;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override onSubmitFormDataSuccess(result: any): void {}

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

  protected override initializeFormValidation(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    control: AbstractControl<any, any>
  ): ValidationErrors | null {
    return null;
  }

  protected override validateForm(): string[] {
    return [];
  }

  protected get filteredCategories(): string[] {
    const categories = this.formGroup.get('categories')?.value || [];
    return this.allCategories.filter(
      category => !categories.includes(category)
    );
  }

  protected get productStatusValue(): ProductStatus {
    return this.formGroup.get('isSelling')?.value
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

  protected onSelectedCategory(event: MatAutocompleteSelectedEvent): void {
    const categories = this.formGroup.get('categories')?.value || [];
    this.formGroup
      .get('categories')
      ?.setValue([...categories, event.option.viewValue]);
    event.option.deselect();
  }

  protected removeCategory(category: string): void {
    const categories = this.formGroup.get('categories')?.value || [];
    const index = categories.indexOf(category);

    if (index >= 0) {
      categories.splice(index, 1);
      this.formGroup.get('categories')?.setValue(categories);
    }
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
