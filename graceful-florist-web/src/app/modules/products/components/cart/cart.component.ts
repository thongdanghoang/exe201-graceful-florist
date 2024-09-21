import {Component, OnInit, inject} from '@angular/core';
import {BreadcrumbItem} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {CartItemDto} from '../../models/product.dto';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

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
  protected cartItems: CartItemDto[] = [];
  protected selectedCartItems: CartItemDto[] = [];
  protected productService: ProductService = inject(ProductService);
  private readonly router: Router = inject(Router);

  ngOnInit(): void {
    this.registerSubscriptions([
      this.productService
        .getCart()
        .subscribe((products: CartItemDto[]): void => {
          this.cartItems = products;
          this.loading = false;
        })
    ]);
  }

  protected isSelected(item: CartItemDto): boolean {
    return this.selectedCartItems.some(
      (cartItem: CartItemDto): boolean => cartItem.id === item.id
    );
  }

  protected toggleSelection(item: CartItemDto): void {
    if (this.isSelected(item)) {
      this.selectedCartItems = this.selectedCartItems.filter(
        (cartItem: CartItemDto): boolean => cartItem.id !== item.id
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

  protected removeFromCart(item: CartItemDto): void {
    this.productService.removeFromCart(item.id);
    this.cartItems = this.cartItems.filter(
      (cartItem: CartItemDto): boolean => cartItem.id !== item.id
    );

    // Update selectedCartItems
    this.selectedCartItems = this.selectedCartItems.filter(
      (cartItem: CartItemDto): boolean => cartItem.id !== item.id
    );
  }

  protected onCartItemQuantityChanges(
    quantity: number,
    item: CartItemDto
  ): void {
    this.productService.changeCartItemQuantity(item.id, quantity);
    this.cartItems = this.cartItems.map(
      (cartItem: CartItemDto): CartItemDto => {
        if (cartItem.id === item.id) {
          return {...cartItem, quantity};
        }
        return cartItem;
      }
    );

    // Update selectedCartItems
    this.selectedCartItems = this.selectedCartItems.map(
      (cartItem: CartItemDto): CartItemDto => {
        if (cartItem.id === item.id) {
          return {...cartItem, quantity};
        }
        return cartItem;
      }
    );
  }

  protected get totalSelectedValue(): number {
    return this.selectedCartItems.reduce(
      (total: number, item: CartItemDto): number =>
        total + item.price * item.quantity,
      0
    );
  }

  protected navigateToProducts(): void {
    void this.router.navigate([AppRoutingConstants.PRODUCTS_PATH]).then();
  }

  protected navigateToCheckout(): void {
    const selectedProductIds: string[] = this.selectedCartItems.map(
      (item: CartItemDto): string => item.id
    );
    const queryParams = {ids: selectedProductIds.join(',')};
    void this.router
      .navigate([AppRoutingConstants.PAYMENT_PATH], {queryParams})
      .then();
  }
}
