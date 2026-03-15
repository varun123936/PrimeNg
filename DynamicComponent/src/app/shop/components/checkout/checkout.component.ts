import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  items$: Observable<CartItem[]>;
  total$: Observable<number>;
  orderPlaced = false;

  constructor(private cartService: CartService) {
    this.items$ = this.cartService.items$;
    this.total$ = this.items$.pipe(
      map((items) => items.reduce((total, item) => total + item.product.price * item.quantity, 0))
    );
  }

  placeOrder(): void {
    this.orderPlaced = true;
  }
}
