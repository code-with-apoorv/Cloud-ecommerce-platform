import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://localhost:8080/api/carts';
  private cartUpdated = new Subject<void>();

  constructor(private http: HttpClient) {}

  private getLocalCart(): any[] {
    const data = localStorage.getItem('demo_cart_items');
    return data ? JSON.parse(data) : [];
  }

  private saveLocalCart(items: any[]): void {
    localStorage.setItem('demo_cart_items', JSON.stringify(items));
    this.notifyCartChange();
  }

  addToCart(productId: number, quantity: number = 1) {
    return this.http.post(`${this.baseUrl}/products/${productId}/quantity/${quantity}`, {}).pipe(
      catchError(() => {
        const cart = this.getLocalCart();
        const existing = cart.find(item => item.productId === productId);
        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.push({
            productId: productId,
            productName: productId === 1 ? 'Apple MacBook Pro 16"' : (productId === 2 ? 'Sony WH-1000XM5' : 'Tech Essential'),
            price: 49990,
            specialPrice: 44990,
            quantity: quantity,
            productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80'
          });
        }
        this.saveLocalCart(cart);
        return of({ message: 'Added to cart' });
      })
    );
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/cart`).pipe(
      catchError(() => {
        const products = this.getLocalCart();
        const totalPrice = products.reduce((sum, item) => sum + (item.specialPrice || item.price) * item.quantity, 0);
        return of({
          cartId: 1,
          totalPrice: totalPrice,
          products: products
        });
      })
    );
  }

  updateQuantity(productId: number, action: 'add' | 'delete') {
    return this.http.put(`${this.baseUrl}/products/${productId}/quantity/${action}`, {}).pipe(
      catchError(() => {
        let cart = this.getLocalCart();
        const item = cart.find(i => i.productId === productId);
        if (item) {
          if (action === 'add') item.quantity++;
          if (action === 'delete') {
            item.quantity--;
            if (item.quantity <= 0) cart = cart.filter(i => i.productId !== productId);
          }
        }
        this.saveLocalCart(cart);
        return of({ message: 'Updated' });
      })
    );
  }

  deleteFromCart(cartId: number, productId: number) {
    return this.http.delete(`${this.baseUrl}/${cartId}/product/${productId}`).pipe(
      catchError(() => {
        const cart = this.getLocalCart().filter(i => i.productId !== productId);
        this.saveLocalCart(cart);
        return of({ message: 'Item removed' });
      })
    );
  }

  notifyCartChange() {
    this.cartUpdated.next();
  }

  onCartChange(): Observable<void> {
    return this.cartUpdated.asObservable();
  }
}