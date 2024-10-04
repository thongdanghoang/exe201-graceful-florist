import {Component, OnInit, inject} from '@angular/core';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreadcrumbItem} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {CartItemDTO} from '../../../cart/models/cart.dto';
import {PaymentMethod} from '../../models/payment.dto';
import {CartService} from '../../../cart/services/cart.service';
import {ModalService} from '../../../shared/services/modal.service';
import {
  PaymentModalComponent,
  PaymentModalOptions
} from '../payment-modal/payment-modal.component';

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
  protected readonly PaymentMethod = PaymentMethod;
  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Thanh toán'}
  ];
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly modalService: ModalService,
    private readonly cartService: CartService
  ) {
    super();
    this.paymentForm = this.fb.group({
      recipient: this.fb.group({
        fullName: ['Ngan', Validators.required],
        phone: ['0342288215', Validators.required],
        district: ['9', Validators.required],
        ward: ['Tan phu', Validators.required],
        addressDetail: ['Topaz home 2', Validators.required]
      }),
      sender: this.fb.group({
        fullName: ['Thong', Validators.required],
        phone: ['0333635470', Validators.required]
      }),
      deliveryDateTime: this.fb.group({
        deliveryDate: ['', Validators.required],
        deliveryTimeFrom: ['09:00:00'],
        deliveryTimeTo: ['']
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

  protected onPaymentSubmit(): void {
    if (this.paymentForm.invalid) {
      return;
    }
    let products = this.paymentForm.get('products')?.value;
    products = products.map((item: CartItemDTO) => {
      return {
        quantity: item.quantity,
        product: {
          id: item.product.id
        }
      };
    });
    this.paymentForm.get('products')?.setValue(products);
    const options: PaymentModalOptions = {
      title: 'Thanh Toán',
      data: {
        data: this.paymentForm.value,
        submitUrl: `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.PAYMENT_PATH}`
      }
    };
    this.modalService.open(PaymentModalComponent, options).then(
      (result: any) => {
        if (result) {
          void this.router.navigate([AppRoutingConstants.HOME_PATH]);
        }
      },
      () => {}
    );
  }

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
