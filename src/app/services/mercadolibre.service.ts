import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MercadoLibreService {
  private apiUrl = 'https://api.mercadolibre.com/sites/MLA/search?q='; // API base de MercadoLibre (MLA es para Argentina)

  constructor(private http: HttpClient) {}

  // Método para buscar productos por query (término de búsqueda)
  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${query}`);
  }
}
