import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from './shop/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DynamicComponent';

  cartItemCount$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItemCount$ = this.cartService.items$.pipe(
      map((items) => items.reduce((count, item) => count + item.quantity, 0))
    );
  }
}
