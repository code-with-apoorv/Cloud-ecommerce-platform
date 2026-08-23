import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const MOCK_PRODUCTS = [
  {
    productId: 1,
    productName: "Apple MacBook Pro 16\" (M3 Max)",
    description: "Liquid Retina XDR display, 36GB unified memory, 1TB SSD, Space Black. Blazing-fast performance for engineering workflows.",
    price: 249999,
    discount: 15,
    specialPrice: 212499,
    quantity: 12,
    categoryId: 1,
    productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80"
  },
  {
    productId: 2,
    productName: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise cancellation, 30-hour battery life, crystal clear hands-free calling, multipoint connection.",
    price: 34990,
    discount: 20,
    specialPrice: 27990,
    quantity: 25,
    categoryId: 2,
    productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"
  },
  {
    productId: 3,
    productName: "Apple iPhone 15 Pro Max (256GB)",
    description: "Titanium design, A17 Pro chip, 48MP main camera system with 5x Telephoto optical zoom, USB-C support.",
    price: 159900,
    discount: 10,
    specialPrice: 143910,
    quantity: 18,
    categoryId: 3,
    productImage: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80"
  },
  {
    productId: 4,
    productName: "Samsung Odyssey Neo G9 Curved Monitor",
    description: "49-inch Dual QHD 240Hz 1000R curved gaming monitor with Quantum Mini-LED and 1ms response time.",
    price: 135000,
    discount: 22,
    specialPrice: 105300,
    quantity: 8,
    categoryId: 4,
    productImage: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80"
  },
  {
    productId: 5,
    productName: "Logitech MX Master 3S Ergonomic Mouse",
    description: "Quiet clicks, 8K DPI any-surface tracking, MagSpeed electromagnetic scrolling, USB-C quick charge.",
    price: 10995,
    discount: 18,
    specialPrice: 8999,
    quantity: 40,
    categoryId: 5,
    productImage: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80"
  },
  {
    productId: 6,
    productName: "Keychron Q1 Pro Custom Mechanical Keyboard",
    description: "QMK/VIA wireless custom mechanical keyboard with CNC aluminum body and hot-swappable switches.",
    price: 19999,
    discount: 12,
    specialPrice: 17599,
    quantity: 15,
    categoryId: 5,
    productImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80"
  }
];

const MOCK_CATEGORIES = [
  { categoryId: 1, categoryName: "Laptops & Computers" },
  { categoryId: 2, categoryName: "Audio & Headphones" },
  { categoryId: 3, categoryName: "Smartphones & Tablets" },
  { categoryId: 4, categoryName: "Gaming & Displays" },
  { categoryId: 5, categoryName: "Accessories & Peripherals" }
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getAll(params: any): Observable<any> {
    return this.http.get(this.baseUrl, { params }).pipe(
      catchError(() => of({ content: MOCK_PRODUCTS, totalPages: 1, totalElements: MOCK_PRODUCTS.length }))
    );
  }

  create(product: any, categoryId: number) {
    return this.http.post(`${this.baseUrl}/categories/${categoryId}`, product).pipe(
      catchError(() => of(product))
    );
  }

  delete(productId: number) {
    return this.http.delete(`${this.baseUrl}/${productId}`).pipe(
      catchError(() => of({ message: 'Deleted' }))
    );
  }

  update(productId: number, product: any) {
    return this.http.put(`${this.baseUrl}/${productId}`, product).pipe(
      catchError(() => of(product))
    );
  }

  search(keyword: string, params: any) {
    return this.http.get(`${this.baseUrl}/search/${keyword}`, { params }).pipe(
      catchError(() => {
        const filtered = MOCK_PRODUCTS.filter(p => 
          p.productName.toLowerCase().includes(keyword.toLowerCase()) || 
          p.description.toLowerCase().includes(keyword.toLowerCase())
        );
        return of({ content: filtered, totalPages: 1 });
      })
    );
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/categories/all').pipe(
      catchError(() => of(MOCK_CATEGORIES))
    );
  }
  
  getProductsByCategory(categoryId: number, params: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/products/categories/${categoryId}`, { params }).pipe(
      catchError(() => {
        const filtered = MOCK_PRODUCTS.filter(p => p.categoryId === categoryId);
        return of({ content: filtered, totalPages: 1 });
      })
    );
  }
  
  createProduct(categoryId: number, data: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/products/categories/${categoryId}`, data).pipe(
      catchError(() => of(data))
    );
  }

  getMyProducts(params: any): Observable<any[]> {
    return this.http.get<any>(`http://localhost:8080/api/products`, { params }).pipe(
      catchError(() => of(MOCK_PRODUCTS))
    );
  }
  
  deleteProduct(productId: number) {
    return this.http.delete(`${this.baseUrl}/products/${productId}`).pipe(
      catchError(() => of({ message: 'Deleted' }))
    );
  }  
}

