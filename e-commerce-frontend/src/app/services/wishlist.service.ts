import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private baseUrl = 'http://localhost:8080/api/wishlist';

  constructor(private http: HttpClient) { }

  private getLocalWishlist(): any[] {
    const data = localStorage.getItem('demo_wishlist_items');
    return data ? JSON.parse(data) : [];
  }

  private saveLocalWishlist(items: any[]): void {
    localStorage.setItem('demo_wishlist_items', JSON.stringify(items));
  }

  getWishlist(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`).pipe(
      catchError(() => of({ products: this.getLocalWishlist() }))
    );
  }

  addProductToWishlist(userId: number, productId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}/${productId}`, {}).pipe(
      catchError(() => {
        const list = this.getLocalWishlist();
        if (!list.find(i => i.productId === productId)) {
          list.push({
            productId: productId,
            productName: 'Saved Tech Item #' + productId,
            price: 29999,
            specialPrice: 24999,
            productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'
          });
          this.saveLocalWishlist(list);
        }
        return of({ message: 'Added to wishlist' });
      })
    );
  }

  removeProductFromWishlist(userId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/${productId}`).pipe(
      catchError(() => {
        const list = this.getLocalWishlist().filter(i => i.productId !== productId);
        this.saveLocalWishlist(list);
        return of({ message: 'Removed from wishlist' });
      })
    );
  }
}

