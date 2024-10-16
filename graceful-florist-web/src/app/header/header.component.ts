import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppRoutingConstants} from '../app-routing-constants';
import {UserRole, UserService} from '../mock/user.service';
import {CartService} from '../modules/cart/services/cart.service';
import {SubscriptionAwareComponent} from '../modules/core/subscription-aware.component';
import {CartItemDTO} from '../modules/cart/models/cart.dto';

@Component({
  selector: 'graceful-florist-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  suggestionUrl = `${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.PRODUCTS_PATH}/suggestions`;
  cartItemCount: number = 0;
  protected readonly AppRoutingConstants = AppRoutingConstants;
  protected readonly UserRole = UserRole;

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly cartService: CartService
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.cartService.cartItemsChanged.subscribe(
        (cartItems: CartItemDTO[]): void => {
          this.cartItemCount = cartItems.length;
        }
      )
    );
  }

  protected onSearchSubmit(keyword: string): void {
    const queryParams = {keyword};
    void this.router.navigate([`${AppRoutingConstants.PRODUCTS_PATH}`], {
      queryParams
    });
  }

  protected get isLoggedIn(): boolean {
    return this.userService.authenticated();
  }

  protected get userRoles(): string[] {
    return this.userService.getUser()?.roles ?? [];
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

  protected navigateToHomepage(): void {
    void this.router.navigate([AppRoutingConstants.HOME_PATH]);
  }

  protected navigateToAdmin(): void {
    void this.router.navigate([`${AppRoutingConstants.ADMIN_PATH}`]);
  }

  protected navigateToProfile(): void {
    void this.router.navigate([`${AppRoutingConstants.USER_PROFILE}`]);
  }

  protected navigateToOrders(): void {
    void this.router.navigate([`${AppRoutingConstants.USER_ORDERS}`]);
  }
}
