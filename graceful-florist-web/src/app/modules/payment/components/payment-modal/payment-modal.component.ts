import {Component, Injector} from '@angular/core';
import {AbstractModalFormComponent} from '../../../shared/components/modal/abstract-modal-form.component';
import {PaymentDto, PaymentMethod} from '../../models/payment.dto';
import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';
import {FormDialogOptions} from '../../../shared/services/modal.service';
import {ProductDetailDto} from '../../../products/models/product.dto';
import {CartService} from '../../../cart/services/cart.service';

export interface PaymentModalOptions
  extends FormDialogOptions<ProductDetailDto> {}

@Component({
  selector: 'graceful-florist-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent extends AbstractModalFormComponent<PaymentDto> {
  paymentFormControls: {
    [key: string]: AbstractControl<any, any>;
  } = {
    recipient: this.formBuilder.group({
      fullName: this.formBuilder.control(null, [Validators.required]),
      phone: this.formBuilder.control(null, [Validators.required]),
      district: this.formBuilder.control(null),
      ward: this.formBuilder.control(null, [Validators.required]),
      addressDetail: this.formBuilder.control(null, [Validators.required]),
      shippingPrice: [null, Validators.required]
    }),
    sender: this.formBuilder.group({
      fullName: this.formBuilder.control(null, [Validators.required]),
      phone: this.formBuilder.control(null, [Validators.required])
    }),
    deliveryDateTime: this.formBuilder.group({
      deliveryDate: ['', Validators.required],
      deliveryTimeFrom: [''],
      deliveryTimeTo: ['']
    }),
    message: this.formBuilder.control(''),
    paymentMethod: this.formBuilder.control(null, Validators.required),
    products: this.formBuilder.control('', Validators.required)
  };

  protected isConfirm = false;

  protected readonly cartService: CartService;

  constructor(injector: Injector) {
    super(injector);
    this.cartService = injector.get(CartService);
  }

  protected get isVNPay(): boolean {
    return this.formGroup.get('paymentMethod')?.value === PaymentMethod.VNPAY;
  }

  protected get recipientAddress(): string {
    const recipient = this.formGroup.get('recipient')?.value;
    if (!recipient.addressDetail || !recipient.ward || !recipient.district) {
      return '';
    }
    return `${recipient.addressDetail}, ${recipient.ward}, ${recipient.district}`;
  }

  protected get recipientName(): string {
    const recipientName = this.formGroup.get('recipient')?.value.fullName;
    return recipientName ? `(${recipientName})` : '';
  }

  protected get senderName(): string {
    const senderName = this.formGroup.get('sender')?.value.fullName;
    return senderName ? `(${senderName})` : '';
  }

  protected get senderPhone(): string {
    return this.formGroup.get('sender')?.value.phone;
  }

  protected override initDefaultData(): PaymentDto {
    if (this.options.data?.data) {
      return this.options.data.data;
    }
    return {} as PaymentDto;
  }
  protected override onSubmitFormDataSuccess(result: any): void {
    this.registerSubscription(this.cartService.fetchCartItems().subscribe());
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
    return this.paymentFormControls;
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
