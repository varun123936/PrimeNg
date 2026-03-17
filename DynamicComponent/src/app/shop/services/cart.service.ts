import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>([]);
  readonly items$ = this.itemsSubject.asObservable();

  getTotal(): number {
    return this.getItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  getItems(): CartItem[] {
    return this.itemsSubject.getValue();
  }

  addToCart(product: Product): void {
    const items = this.getItems();
    const existing = items.find((item) => item.product.id === product.id);

    if (existing) {
      existing.quantity += 1;
      this.itemsSubject.next([...items]);
      return;
    }

    this.itemsSubject.next([...items, { product, quantity: 1 }]);
  }

  removeFromCart(productId: number): void {
    const items = this.getItems().filter((item) => item.product.id !== productId);
    this.itemsSubject.next(items);
  }

  decrementQuantity(productId: number): void {
    const items = this.getItems();
    const existing = items.find((item) => item.product.id === productId);
    if (!existing) {
      return;
    }
    existing.quantity -= 1;
    if (existing.quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.itemsSubject.next([...items]);
  }

  clearCart(): void {
    this.itemsSubject.next([]);
  }
}
