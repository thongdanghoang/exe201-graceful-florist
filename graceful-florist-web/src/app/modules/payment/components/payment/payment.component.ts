import {Component, OnInit, inject} from '@angular/core';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BreadcrumbItem} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {CartItemDTO} from '../../../cart/models/cart.dto';
import {PaymentDto, PaymentMethod} from '../../models/payment.dto';
import {CartService} from '../../../cart/services/cart.service';
import {ModalService} from '../../../shared/services/modal.service';
import {PaymentModalComponent} from '../payment-modal/payment-modal.component';
import {ProductService} from '../../../products/services/product.service';
import {ShippingPriceDTO} from '../../../products/models/product.dto';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'graceful-florist-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  protected readonly PaymentMethod = PaymentMethod;
  protected shippingPrices: ShippingPriceDTO[] = [];
  protected paymentForm: FormGroup;
  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Thanh toán'}
  ];
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly modalService: ModalService,
    private readonly cartService: CartService,
    private readonly productService: ProductService
  ) {
    super();
    this.paymentForm = this.fb.group({
      recipient: this.fb.group({
        fullName: ['', Validators.required],
        phone: ['', Validators.required],
        district: [''],
        ward: ['', Validators.required],
        addressDetail: ['', Validators.required],
        shippingPrice: [null, Validators.required]
      }),
      sender: this.fb.group({
        fullName: ['', Validators.required],
        phone: ['', Validators.required]
      }),
      deliveryDateTime: this.fb.group({
        deliveryDate: ['', Validators.required],
        deliveryTimeFrom: ['09:00:00'],
        deliveryTimeTo: ['']
      }),
      message: [''],
      paymentMethod: [PaymentMethod.COD, Validators.required],
      products: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.registerSubscriptions([
      this.route.queryParamMap.subscribe(params => {
        const productIDs = params.get('products')?.split(',');
        if (productIDs) {
          this.registerSubscription(
            this.cartService
              .fetchCartItems()
              .subscribe((cartItems: CartItemDTO[]): void => {
                const products = cartItems.filter(
                  (item: CartItemDTO): boolean =>
                    productIDs.includes(item.product.id)
                );
                if (products.length === 1 && products[0].product.owner) {
                  this.registerSubscription(
                    this.productService
                      .getProductById(products[0].product.id)
                      .subscribe(product => {
                        products[0].product.ingredients = product.ingredients;
                      })
                  );
                }
                this.paymentForm.get('products')?.setValue(products);
              })
          );
        }
      }),
      this.productService
        .getShippingPrices()
        .subscribe((shippingPrices: ShippingPriceDTO[]): void => {
          this.shippingPrices = shippingPrices;
        })
    ]);
  }

  protected onSelectedShippingPrice(change: MatSelectChange): void {
    this.paymentForm
      .get('recipient')
      ?.get('district')
      ?.setValue(change.value.name);
  }

  protected deliveryTimeFromChanged(deliveryTimeFrom: Date): void {
    this.paymentForm
      .get('deliveryDateTime')
      ?.get('deliveryTimeFrom')
      ?.setValue(deliveryTimeFrom);
  }

  protected deliveryTimeToChanged(deliveryTimeTo: Date): void {
    this.paymentForm
      .get('deliveryDateTime')
      ?.get('deliveryTimeTo')
      ?.setValue(deliveryTimeTo);
  }

  protected onPaymentSubmit(): void {
    void this.modalService
      .open(PaymentModalComponent, {
        title: 'Thanh Toán',
        data: {
          data: this.paymentForm.value,
          submitUrl: `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.PAYMENT_PATH}`
        }
      })
      .then((result: PaymentDto): void => {
        if (result) {
          this.registerSubscription(
            this.cartService
              .fetchCartItems()
              .subscribe((cartItems: CartItemDTO[]): void => {
                this.cartService.cartItemsChanged.next(cartItems);
                void this.router.navigate([
                  `${AppRoutingConstants.ORDERS_PATH}/${result.id}`
                ]);
              })
          );
        }
      });
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
    if (
      !recipient.addressDetail ||
      !recipient.ward ||
      !recipient.shippingPrice
    ) {
      return '';
    }
    return `${recipient.addressDetail}, ${recipient.ward}, ${recipient.shippingPrice.name}`;
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
