import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CartCountComponent } from './components/cart-count/cart-count.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent, CartComponent, CartCountComponent, CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    PaginatorModule
  ],
  exports: [ProductListComponent, ProductDetailComponent, CartComponent, CartCountComponent, CheckoutComponent]
})
export class ShopModule {}
