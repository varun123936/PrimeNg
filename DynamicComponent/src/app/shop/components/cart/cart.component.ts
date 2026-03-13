import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items$: Observable<CartItem[]>;

  constructor(private cartService: CartService) {
    this.items$ = this.cartService.items$;
  }
}
