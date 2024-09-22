import {Injectable} from '@angular/core';
import {Observable, delay, of} from 'rxjs';
interface ProductDto {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export interface CartItemDto extends ProductDto {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_ITEMS_KEY = 'cartItems';

  constructor() {}

  addToCart(items: CartItemDto[]): void {
    const cartItemsJson = localStorage.getItem(this.CART_ITEMS_KEY);
    let cartItems: CartItemDto[] = [];

    if (cartItemsJson) {
      cartItems = JSON.parse(cartItemsJson);
    }

    items.forEach((newItem: CartItemDto): void => {
      const index = cartItems.findIndex(
        (cartItem: CartItemDto): boolean => cartItem.id === newItem.id
      );
      if (index !== -1) {
        cartItems[index].quantity += newItem.quantity;
      } else {
        cartItems.push(newItem);
      }
    });

    localStorage.setItem(this.CART_ITEMS_KEY, JSON.stringify(cartItems));
  }

  changeCartItemQuantity(id: string, quantity: number): void {
    const cartItemsJson = localStorage.getItem(this.CART_ITEMS_KEY);
    if (!cartItemsJson) {
      return;
    }
    const cartItems = JSON.parse(cartItemsJson);
    const index = cartItems.findIndex(
      (cartItem: CartItemDto): boolean => cartItem.id === id
    );
    if (index === -1) {
      return;
    }
    cartItems[index].quantity = quantity;
    localStorage.setItem(this.CART_ITEMS_KEY, JSON.stringify(cartItems));
  }

  removeFromCart(id: string): void {
    const cartItemsJson = localStorage.getItem(this.CART_ITEMS_KEY);
    if (!cartItemsJson) {
      return;
    }
    const cartItems = JSON.parse(cartItemsJson);
    const index = cartItems.findIndex(
      (cartItem: CartItemDto): boolean => cartItem.id === id
    );
    if (index === -1) {
      return;
    }
    cartItems.splice(index, 1);
    localStorage.setItem(this.CART_ITEMS_KEY, JSON.stringify(cartItems));
  }

  getCart(): Observable<CartItemDto[]> {
    const cartItemsJson = localStorage.getItem(this.CART_ITEMS_KEY);
    const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
    return of(cartItems).pipe(delay(1000));
  }
}
