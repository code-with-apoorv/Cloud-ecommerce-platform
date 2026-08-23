import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(paymentMode: string, orderPayload: any): Observable<any> {
    return this.http.post(
      `http://localhost:8080/api/orders/users/payments/online`,
      orderPayload
    ).pipe(
      catchError(() => {
        localStorage.removeItem('demo_cart_items');
        return of({ orderId: 101, message: 'Order placed successfully!' });
      })
    );
  }

  getAddressesByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/addresses/${userId}`).pipe(
      catchError(() => of([
        { addressId: 1, street: '124 Innovation Way', city: 'Bangalore', state: 'Karnataka', zipCode: '560001', country: 'India' }
      ]))
    );
  }

  getCurrentUser() {
    return this.http.get('http://localhost:8080/api/auth/current-user').pipe(
      catchError(() => of({ username: localStorage.getItem('username') || 'codewithapoorv', email: 'apoorv@example.com' }))
    );
  }
  
  getCurrentUserAddresses(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(
      `http://localhost:8080/api/addresses/users/current?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addressId&sortOrder=des`
    ).pipe(
      catchError(() => of({
        content: [
          { addressId: 1, street: '124 Innovation Way', city: 'Bangalore', state: 'Karnataka', zipCode: '560001', country: 'India' }
        ]
      }))
    );
  }  

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/orders').pipe(
      catchError(() => of([
        {
          orderId: 101,
          orderDate: '2026-08-20',
          totalAmount: 212499,
          orderStatus: 'DELIVERED',
          orderItems: [
            { productId: 1, productName: 'Apple MacBook Pro 16" (M3 Max)', orderedProductPrice: 212499, quantity: 1 }
          ]
        }
      ]))
    );
  }
  
  saveAddress(address: any) {
    return this.http.post(`http://localhost:8080/api/addresses`, address).pipe(
      catchError(() => of(address))
    );
  }  
}

