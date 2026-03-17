import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  categories: { label: string; value: string }[] = [];
  selectedCategory = 'all';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const category = params.get('category');
      this.selectedCategory = category || 'all';
      this.first = 0;
      this.loadProducts();
    });
    this.loadCategories();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    const source$ =
      this.selectedCategory === 'all'
        ? this.productService.getProducts()
        : this.productService.getProductsByCategory(this.selectedCategory);

    source$.subscribe(
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

  onCategoryChange(): void {
    this.first = 0;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: this.selectedCategory === 'all' ? null : this.selectedCategory },
      queryParamsHandling: 'merge'
    });
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

  private loadCategories(): void {
    this.productService.getCategories().subscribe(
      (categories) => {
        const options = (categories || []).map((category) => ({
          label: category,
          value: category
        }));
        this.categories = [{ label: 'All Categories', value: 'all' }, ...options];
      },
      () => {
        this.categories = [{ label: 'All Categories', value: 'all' }];
      }
    );
  }
}
