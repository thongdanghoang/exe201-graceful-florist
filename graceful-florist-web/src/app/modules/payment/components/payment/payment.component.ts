import {Component, OnInit, inject} from '@angular/core';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreadcrumbItem} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {CartItemDto} from '../../../cart/services/cart.service';

export enum PaymentMethod {
  COD = 'COD',
  BANKING = 'BANKING'
}

@Component({
  selector: 'graceful-florist-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  protected paymentForm: FormGroup;
  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Thanh toán'}
  ];
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private readonly fb: FormBuilder) {
    super();
    this.paymentForm = this.fb.group({
      recipient: this.fb.group({
        fullName: ['', Validators.required],
        phone: ['', Validators.required],
        district: ['', Validators.required],
        ward: ['', Validators.required],
        addressDetail: ['', Validators.required]
      }),
      sender: this.fb.group({
        fullName: ['', Validators.required],
        phone: ['', Validators.required]
      }),
      deliveryDateTime: this.fb.group({
        deliveryDate: ['', Validators.required],
        deliveryTime: ['']
      }),
      message: [''],
      method: [PaymentMethod.COD, Validators.required],
      products: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.registerSubscriptions([
      this.route.queryParamMap.subscribe(params => {
        const products = params.get('products');
        if (products) {
          const parsedProducts: CartItemDto[] = JSON.parse(products);
          this.paymentForm.get('products')?.setValue(parsedProducts);
        }
      })
    ]);
  }

  protected onPaymentSubmit(): void {}

  protected get cartItemsLength(): number {
    return this.paymentForm.get('products')?.value.length;
  }

  protected get cartItems(): CartItemDto[] {
    return this.paymentForm.get('products')?.value;
  }

  protected get totalSelectedValue(): number {
    return this.cartItems.reduce(
      (total: number, item: CartItemDto): number =>
        total + item.price * item.quantity,
      0
    );
  }

  protected get recipientAddress(): string {
    const recipient = this.paymentForm.get('recipient')?.value;
    if (!recipient.addressDetail || !recipient.ward || !recipient.district) {
      return '';
    }
    return `${recipient.addressDetail}, ${recipient.ward}, ${recipient.district}`;
  }

  protected get recipientName(): string {
    const recipientName = this.paymentForm.get('recipient')?.value.fullName;
    return recipientName ? `(${recipientName})` : '';
  }

  protected get senderName(): string {
    const senderName = this.paymentForm.get('sender')?.value.fullName;
    return senderName ? `(${senderName})` : '';
  }

  protected get senderPhone(): string {
    return this.paymentForm.get('sender')?.value.phone;
  }
}
