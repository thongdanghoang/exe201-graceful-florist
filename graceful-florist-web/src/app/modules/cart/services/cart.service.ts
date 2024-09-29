import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, delay, of} from 'rxjs';
import {CartItemDto} from '../models/cart.dto';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems$: Observable<CartItemDto[]>;
  private readonly cartItemsSubject: BehaviorSubject<CartItemDto[]>;
  private readonly CART_ITEMS_KEY = 'cartItems';

  constructor() {
    this.cartItemsSubject = new BehaviorSubject<CartItemDto[]>([]);
    this.cartItems$ = this.cartItemsSubject.asObservable();
    this.loadCartItems();
  }

  loadCartItems(): void {
    const cartItemsJson = localStorage.getItem(this.CART_ITEMS_KEY);
    const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
    this.cartItemsSubject.next(cartItems);
  }

  addToCart(items: CartItemDto[]): void {
    const cartItems = this.cartItemsSubject.value;

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
    this.cartItemsSubject.next(cartItems);
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
    this.cartItemsSubject.next(cartItems);
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
    this.cartItemsSubject.next(cartItems);
  }

  getCart(): Observable<CartItemDto[]> {
    const cartItemsJson = localStorage.getItem(this.CART_ITEMS_KEY);
    const cartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
    return of(cartItems).pipe(delay(1000));
  }
}
