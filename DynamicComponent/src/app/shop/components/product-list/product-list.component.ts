import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

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

  constructor(private productService: ProductService) {}

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

  private updateVisibleProducts(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.visibleProducts = this.products.slice(start, end);
  }
}
