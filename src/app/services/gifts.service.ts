import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para los regalos
interface Gift {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  eventId: string;
}

@Injectable({
  providedIn: 'root',
})
export class GiftsService {
  private apiUrl = 'http://localhost:3000/gifts'; 
  private eventsUrl = 'http://localhost:3000/events'; 
  private guestsUrl = 'http://localhost:3000/guests'; 
  constructor(private http: HttpClient) {}

  
  getGiftsByEvent(eventId: string): Observable<Gift[]> {
    return this.http.get<Gift[]>(`${this.apiUrl}?eventId=${eventId}`);
  }

 
addGift(gift: Gift): Observable<Gift> {
  return this.http.post<Gift>(this.apiUrl, gift);
}


updateGift(gift: Gift): Observable<Gift> {
  return this.http.put<Gift>(`${this.apiUrl}/${gift.id}`, gift);
}


  
  verifyEventCode(code: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.eventsUrl}?code=${code}`);
  }

  
  registerGuest(guest: any): Observable<any> {
    return this.http.post<any>(this.guestsUrl, guest);
  }

  
  verifyGuest(guest: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.guestsUrl}?dni=${guest.dni}&eventId=${guest.eventId}`);
  }
}
