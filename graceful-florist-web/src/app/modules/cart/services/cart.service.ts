import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, map} from 'rxjs';
import {CartItemDTO} from '../models/cart.dto';
import {HttpClient} from '@angular/common/http';
import {AppRoutingConstants} from '../../../app-routing-constants';
import {tap} from 'rxjs/operators';
import {ProductDto} from '../../products/models/product.dto';
import {UserService} from '../../../mock/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public readonly cartItemsChanged: BehaviorSubject<CartItemDTO[]>;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly userService: UserService
  ) {
    this.cartItemsChanged = new BehaviorSubject<CartItemDTO[]>([]);
    this.userService.user$.subscribe(() => {
      this.fetchCartItems().subscribe((cartItems: CartItemDTO[]): void => {
        this.cartItemsChanged.next(cartItems);
      });
    });
  }

  fetchCartItems(): Observable<CartItemDTO[]> {
    return this.httpClient
      .get<
        CartItemDTO[]
      >(`${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.CART_PATH}`)
      .pipe(
        map((cartItems: CartItemDTO[]) =>
          cartItems.map((item: CartItemDTO) => ({
            ...item,
            product: this.mapProductImages(item.product)
          }))
        ),
        tap((cartItems: CartItemDTO[]): void => {
          this.cartItemsChanged.next(cartItems);
        })
      );
  }

  saveOrUpdate(item: CartItemDTO): Observable<CartItemDTO[]> {
    return this.httpClient
      .put<
        CartItemDTO[]
      >(`${AppRoutingConstants.BACKEND_API_URL}/${AppRoutingConstants.CART_PATH}`, item)
      .pipe(
        map((cartItems: CartItemDTO[]) =>
          cartItems.map((item: CartItemDTO) => ({
            ...item,
            product: this.mapProductImages(item.product)
          }))
        ),
        tap((cartItems: CartItemDTO[]): void => {
          this.cartItemsChanged.next(cartItems);
        })
      );
  }

  private mapProductImages(product: ProductDto): ProductDto {
    return {
      ...product,
      imageUrl: product.images.length
        ? `${AppRoutingConstants.BACKEND_API_URL}/images/${product.images[0]}`
        : '',
      images: product.images.length
        ? product.images
            .slice(1)
            .map(
              image => `${AppRoutingConstants.BACKEND_API_URL}/images/${image}`
            )
        : []
    };
  }
}
