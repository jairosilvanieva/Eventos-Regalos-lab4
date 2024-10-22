import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir la interfaz Gift localmente
interface Gift {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  eventId: string; // Asociar el regalo a un evento específico
}

@Injectable({
  providedIn: 'root',
})
export class GiftsService {
  private apiUrl = 'http://localhost:3000/gifts'; // URL base para regalos
  private guestsUrl = 'http://localhost:3000/guests'; // URL para los invitados
  private eventsUrl = 'http://localhost:3000/events'; // URL para eventos

  constructor(private http: HttpClient) {}

  // Obtener todos los regalos
  getGifts(): Observable<Gift[]> {
    return this.http.get<Gift[]>(this.apiUrl);
  }

  // Obtener los regalos filtrados por eventoId
  getGiftsByEvent(eventId: string): Observable<Gift[]> {
    return this.http.get<Gift[]>(`${this.apiUrl}?eventId=${eventId}`);
  }

  // Obtener un regalo por su ID
  getGiftByMLId(eventId: string, mlId: string): Observable<Gift> {
    return this.http.get<Gift>(
      `${this.apiUrl}?eventId=${eventId}?productId=${mlId}`
    );
  }

  // Agregar un regalo
  addGift(gift: Gift): Observable<Gift> {
    return this.http.post<Gift>(this.apiUrl, gift);
  }

  // Actualizar un regalo
  updateGift(gift: Gift): Observable<Gift> {
    return this.http.put<Gift>(`${this.apiUrl}/${gift.id}`, gift);
  }

  // Verificar el código del evento
  verifyEventCode(code: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.eventsUrl}?code=${code}`);
  }

  // Registrar un invitado
  registerGuest(guest: any): Observable<any> {
    return this.http.post<any>(this.guestsUrl, guest);
  }
}
