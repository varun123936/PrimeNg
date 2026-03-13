import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  visibleProducts: Product[] = [];
  totalRecords = 0;
  rows = 8;
  first = 0;
  isLoading = false;
  errorMessage = '';
  recentlyAddedId: number | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products || [];
        this.totalRecords = this.products.length;
        this.updateVisibleProducts();
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.errorMessage = 'Unable to load products. Please try again.';
      }
    );
  }

  onPageChange(event: { first: number; rows: number }): void {
    this.first = event.first;
    this.rows = event.rows;
    this.updateVisibleProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.recentlyAddedId = product.id;
    setTimeout(() => {
      if (this.recentlyAddedId === product.id) {
        this.recentlyAddedId = null;
      }
    }, 2000);
  }

  private updateVisibleProducts(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.visibleProducts = this.products.slice(start, end);
  }
}
