import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(private cartService: CartService) {
    this.items$ = this.cartService.items$;
    this.total$ = this.items$.pipe(
      map((items) => items.reduce((total, item) => total + item.product.price * item.quantity, 0))
    );
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  decrementItem(productId: number): void {
    this.cartService.decrementQuantity(productId);
  }

  incrementItem(productId: number): void {
    const item = this.cartService.getItems().find((entry) => entry.product.id === productId);
    if (!item) {
      return;
    }
    this.cartService.addToCart(item.product);
  }
}
