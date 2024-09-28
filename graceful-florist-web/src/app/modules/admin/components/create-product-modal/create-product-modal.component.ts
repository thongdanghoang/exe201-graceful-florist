import {Component, Injector} from '@angular/core';
import {DialogOptions} from '../../../shared/services/modal.service';
import {AbstractModalFormComponent} from '../../../shared/components/modal/abstract-modal-form.component';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import {ProductStatus} from '../../../products/models/product.dto';

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
    category: this.formBuilder.control(null, [Validators.required]),
    image: this.formBuilder.control(null, [Validators.required]),
    isSelling: this.formBuilder.control(false)
  };

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
}
