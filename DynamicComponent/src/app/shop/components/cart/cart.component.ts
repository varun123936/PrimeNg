import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { ShopToastService } from '../../services/shop-toast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(private cartService: CartService, private toast: ShopToastService) {
    this.items$ = this.cartService.items$;
    this.total$ = this.items$.pipe(
      map((items) => items.reduce((total, item) => total + item.product.price * item.quantity, 0))
    );
  }

  removeItem(productId: number): void {
    const item = this.cartService.getItems().find((entry) => entry.product.id === productId);
    this.cartService.removeFromCart(productId);
    if (item) {
      this.toast.info('Removed from cart', item.product.title);
    }
  }

  decrementItem(productId: number): void {
    const item = this.cartService.getItems().find((entry) => entry.product.id === productId);
    if (!item) {
      return;
    }
    const wasLast = item.quantity === 1;
    this.cartService.decrementQuantity(productId);
    if (wasLast) {
      this.toast.info('Removed from cart', item.product.title);
    } else {
      this.toast.info('Quantity decreased', item.product.title);
    }
  }

  incrementItem(productId: number): void {
    const item = this.cartService.getItems().find((entry) => entry.product.id === productId);
    if (!item) {
      return;
    }
    this.cartService.addToCart(item.product);
    this.toast.info('Quantity increased', item.product.title);
  }
}
