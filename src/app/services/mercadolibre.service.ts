import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSearchResponse } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class MercadoLibreService {
  private readonly PRODUCT_ENDPOINT = 'https://dummyjson.com/products/search';

  constructor(private http: HttpClient) { }

  searchProducts(query: string, limit: number, offset: number): Observable<ProductSearchResponse> {
    return this.http.get<ProductSearchResponse>(`${this.PRODUCT_ENDPOINT}?q=${query}&limit=${limit}&skip=${offset}`);
  }
}
