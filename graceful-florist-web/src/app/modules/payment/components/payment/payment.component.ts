import {Component, OnInit, inject} from '@angular/core';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreadcrumbItem} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {CartItemDTO} from '../../../cart/models/cart.dto';
import {PaymentMethod} from '../../models/payment.dto';
import {CartService} from '../../../cart/services/cart.service';

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

  constructor(
    private readonly fb: FormBuilder,
    private readonly cartService: CartService
  ) {
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
      paymentMethod: [PaymentMethod.COD, Validators.required],
      products: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.registerSubscriptions([
      this.route.queryParamMap.subscribe(params => {
        const productIDs = params.get('products')?.split(',');
        if (productIDs) {
          const cartItemDTOS = this.cartService.cartItemsChanged.value.filter(
            item => productIDs.includes(item.product.id)
          );
          this.paymentForm.get('products')?.setValue(cartItemDTOS);
        }
      })
    ]);
  }

  protected onPaymentSubmit(): void {}

  protected get cartItemsLength(): number {
    return this.paymentForm.get('products')?.value.length;
  }

  protected get cartItems(): CartItemDTO[] {
    return this.paymentForm.get('products')?.value;
  }

  protected get totalSelectedValue(): number {
    if (!this.cartItems) {
      return 0;
    }
    return this.cartItems.reduce(
      (total: number, item: CartItemDTO): number =>
        total + item.product.price * item.quantity,
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
