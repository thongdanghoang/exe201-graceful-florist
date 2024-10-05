import {Component, Injector} from '@angular/core';
import {AbstractModalFormComponent} from '../../../shared/components/modal/abstract-modal-form.component';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import {FormDialogOptions} from '../../../shared/services/modal.service';
import {CategoryDto, CategoryType} from '../../model/category.dto';

export interface CategoryModalOptions extends FormDialogOptions<CategoryDto> {
  title: string;
}
@Component({
  selector: 'graceful-florist-category-detail-mail',
  templateUrl: './category-detail-modal.component.html'
})
export class CategoryDetailModalComponent extends AbstractModalFormComponent<CategoryDto> {
  categoryFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    id: this.formBuilder.control(null),
    version: this.formBuilder.control(null),
    name: this.formBuilder.control(null, [Validators.required]),
    type: this.formBuilder.control(null, [Validators.required]),
    enabled: this.formBuilder.control(false)
  };

  constructor(injector: Injector) {
    super(injector);
  }

  protected get isEditMode(): boolean {
    return !!this.options?.data?.data.id;
  }

  protected get categoriesType(): CategoryType[] {
    return Object.values(CategoryType);
  }

  protected override onSubmitFormDataSuccess(result: any): void {
    this.close(result);
  }

  protected override initDefaultData(): CategoryDto {
    if (this.options.data?.data) {
      return this.options.data.data;
    }
    return {} as CategoryDto;
  }

  protected override initializeFormValidation(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    control: AbstractControl<any, any>
  ): ValidationErrors | null {
    return null;
  }

  protected override initializeFormControls(): {
    [key: string]: AbstractControl<any, any>;
  } {
    return this.categoryFormControls;
  }

  protected override validateForm(): string[] {
    return [];
  }

  protected override prepareDataBeforeSubmit(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override showSaveSuccessNotification(result: any): void {}

  protected override showValidationErrorNotification(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected override onSubmitFormRequestError(error: any): void {}
}
