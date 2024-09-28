import {
  Component,
  Injector,
  WritableSignal,
  computed,
  signal
} from '@angular/core';
import {DialogOptions} from '../../../shared/services/modal.service';
import {AbstractModalFormComponent} from '../../../shared/components/modal/abstract-modal-form.component';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import {ProductStatus} from '../../../products/models/product.dto';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

export interface BasicModalOptions extends DialogOptions<string> {
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

interface CreateProductDto {}

@Component({
  selector: 'graceful-florist-create-product-modal',
  templateUrl: './create-product-modal.component.html',
  styleUrl: './create-product-modal.component.css'
})
export class CreateProductModalComponent extends AbstractModalFormComponent<CreateProductDto> {
  createProductFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    name: this.formBuilder.control(null, [Validators.required]),
    description: this.formBuilder.control(null),
    price: this.formBuilder.control(null, [Validators.required]),
    categories: this.formBuilder.control(null, [Validators.required]),
    image: this.formBuilder.control(null, [Validators.required]),
    isSelling: this.formBuilder.control(false)
  };

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly allCategories: string[] = [
    'Hoa Khai Trương',
    'Hoa hồng',
    'Hoa ly',
    'Hoa lan',
    'Hoa cúc'
  ];
  readonly filteredCategories = computed(() => {
    const currentCategory = this.formGroup
      .get('currentCategory')
      ?.value.toLowerCase();
    return currentCategory
      ? this.allCategories.filter(fruit =>
          fruit.toLowerCase().includes(currentCategory)
        )
      : this.allCategories.slice();
  });

  protected readonly ProductStatus = ProductStatus;

  constructor(injector: Injector) {
    super(injector);
  }

  protected get productStatusValue(): ProductStatus {
    return this.formGroup.get('isSelling')?.value
      ? ProductStatus.SELLING
      : ProductStatus.NOT_SELLING;
  }

  protected override initDefaultData(): CreateProductDto {
    return {};
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

  protected onAddCategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      const categories = this.formGroup.get('categories')?.value || [];
      this.formGroup.get('categories')?.setValue([...categories, value]);
    }

    // Clear the input value
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
}
