import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  isLoading = false;
  errorMessage = '';
  addedToCart = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'Invalid product.';
      return;
    }
    this.loadProduct(id);
  }

  loadProduct(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProductById(id).subscribe(
      (product) => {
        this.product = product;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.errorMessage = 'Unable to load product details.';
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addToCart(): void {
    if (!this.product) {
      return;
    }
    this.cartService.addToCart(this.product);
    this.addedToCart = true;
    setTimeout(() => {
      this.addedToCart = false;
    }, 2000);
  }
}
