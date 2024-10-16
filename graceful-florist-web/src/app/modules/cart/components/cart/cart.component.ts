import {Component, OnInit, inject} from '@angular/core';
import {BreadcrumbItem} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {Router} from '@angular/router';
import {CartService} from '../../services/cart.service';
import {CartItemDTO} from '../../models/cart.dto';

@Component({
  selector: 'graceful-florist-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  protected breadcrumbs: BreadcrumbItem[] = [
    {label: 'Trang chủ', path: AppRoutingConstants.HOME_PATH},
    {label: 'Giả hàng'}
  ];
  protected productDisplayedColumns: string[] = [
    'select',
    'name',
    'price',
    'quantity',
    'actions'
  ];
  protected loading: boolean = true;
  protected cartItems: CartItemDTO[] = [];
  protected selectedCartItems: CartItemDTO[] = [];
  private readonly cartService: CartService = inject(CartService);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    this.registerSubscriptions([
      this.cartService.cartItemsChanged.subscribe(
        (cartItems: CartItemDTO[]): void => {
          this.cartItems = cartItems.sort((a: CartItemDTO): number =>
            a.product.owner === null ? 1 : -1
          );
          this.loading = false;
        }
      )
    ]);
  }

  protected get paymentValid(): boolean {
    if (this.selectedCartItems.length === 0) {
      return false;
    }
    if (this.selectedCartItems.length === 1) {
      return true;
    }
    return (
      this.selectedCartItems.filter(
        (item: CartItemDTO): boolean => item.product.owner !== null
      ).length === 0
    );
  }

  protected isSelected(item: CartItemDTO): boolean {
    return this.selectedCartItems.some(
      (cartItem: CartItemDTO): boolean =>
        cartItem.product.id === item.product.id
    );
  }

  protected toggleSelection(item: CartItemDTO): void {
    if (this.isSelected(item)) {
      this.selectedCartItems = this.selectedCartItems.filter(
        (cartItem: CartItemDTO): boolean =>
          cartItem.product.id !== item.product.id
      );
    } else {
      this.selectedCartItems.push(item);
    }
  }

  protected isAllSelected(): boolean {
    const numSelected = this.selectedCartItems.length;
    const numRows = this.cartItems.length;
    return numSelected === numRows;
  }

  protected isIndeterminate(): boolean {
    const numSelected = this.selectedCartItems.length;
    const numRows = this.cartItems.length;
    return numSelected > 0 && numSelected < numRows;
  }

  protected masterToggle(): void {
    if (this.isAllSelected()) {
      this.selectedCartItems = [];
    } else {
      this.selectedCartItems = [...this.cartItems];
    }
  }

  protected removeFromCart(item: CartItemDTO): void {
    item.quantity = 0;
    this.registerSubscription(this.cartService.saveOrUpdate(item).subscribe());
    this.cartItems = this.cartItems.filter(
      (cartItem: CartItemDTO): boolean =>
        cartItem.product.id !== item.product.id
    );
    // Update selectedCartItems
    this.selectedCartItems = this.selectedCartItems.filter(
      (cartItem: CartItemDTO): boolean =>
        cartItem.product.id !== item.product.id
    );
  }

  protected onCartItemQuantityChanges(
    quantity: number,
    item: CartItemDTO
  ): void {
    item.quantity = quantity;
    this.registerSubscription(this.cartService.saveOrUpdate(item).subscribe());
    this.cartItems = this.cartItems.map(
      (cartItem: CartItemDTO): CartItemDTO => {
        if (cartItem.product.id === item.product.id) {
          return {...cartItem, quantity};
        }
        return cartItem;
      }
    );

    // Update selectedCartItems
    this.selectedCartItems = this.selectedCartItems.map(
      (cartItem: CartItemDTO): CartItemDTO => {
        if (cartItem.product.id === item.product.id) {
          return {...cartItem, quantity};
        }
        return cartItem;
      }
    );
  }

  protected get totalSelectedValue(): number {
    return this.selectedCartItems.reduce(
      (total: number, item: CartItemDTO): number =>
        total + item.product.price * item.quantity,
      0
    );
  }

  protected navigateToProducts(): void {
    void this.router.navigate([AppRoutingConstants.PRODUCTS_PATH]).then();
  }

  protected navigateToCheckout(): void {
    const productIDs = this.selectedCartItems
      .map((item: CartItemDTO) => item.product.id)
      .join(',');
    const queryParams = {products: productIDs};
    void this.router
      .navigate([AppRoutingConstants.PAYMENT_PATH], {queryParams})
      .then();
  }
}
