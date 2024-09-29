import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppRoutingConstants} from '../app-routing-constants';
import {UserService} from '../mock/mock-user.service';
import {CartService} from '../modules/cart/services/cart.service';
import {SubscriptionAwareComponent} from '../modules/core/subscription-aware.component';
import {CartItemDto} from '../modules/cart/models/cart.dto';

@Component({
  selector: 'graceful-florist-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  cartItemCount: number = 0;
  protected readonly AppRoutingConstants = AppRoutingConstants;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly cartService: CartService
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.cartService.cartItems$.subscribe((cartItems: CartItemDto[]) => {
        this.cartItemCount = cartItems.reduce(
          (count, item) => count + item.quantity,
          0
        );
      })
    );
  }

  protected get isLoggedIn(): boolean {
    return this.userService.authenticated();
  }

  protected navigateToLoginPage(): void {
    if (this.userService.authenticated()) {
      this.userService.clearUser();
    }
    void this.router.navigate([AppRoutingConstants.AUTH_PATH]);
  }

  protected navigateToProducts(): void {
    void this.router.navigate([AppRoutingConstants.PRODUCTS_PATH]);
  }

  protected navigateToCart(): void {
    void this.router.navigate([
      `${AppRoutingConstants.PRODUCTS_PATH}/${AppRoutingConstants.CART_PATH}`
    ]);
  }

  protected navigateToCustomization(): void {
    void this.router.navigate([
      `${AppRoutingConstants.PRODUCTS_PATH}/${AppRoutingConstants.CUSTOMIZE_FLOWER_PATH}`
    ]);
  }

  protected navigateToDevMode(): void {
    void this.router.navigate([AppRoutingConstants.DEV_PATH]);
  }

  protected navigateToHomepage(): void {
    void this.router.navigate([AppRoutingConstants.HOME_PATH]);
  }

  protected navigateToOrdersTracking(): void {
    void this.router.navigate([`${AppRoutingConstants.ORDERS_PATH}`]);
  }

  protected onLogout(): void {
    this.userService.clearUser();
    void this.router.navigate([AppRoutingConstants.AUTH_PATH]);
  }
}
