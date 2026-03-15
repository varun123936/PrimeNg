import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './dynamic-form/components/form-builder/form-builder.component';
import { ProductListComponent } from './shop/components/product-list/product-list.component';
import { ProductDetailComponent } from './shop/components/product-detail/product-detail.component';
import { CartComponent } from './shop/components/cart/cart.component';
import { CheckoutComponent } from './shop/components/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'form-builder', component: FormBuilderComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
