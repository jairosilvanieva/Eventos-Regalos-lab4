import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir la interfaz Event localmente
interface Event {
  id: string;
  eventType: string;
  location: string;
  date: string;
  time: string;
  description: string;
  code: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = 'http://localhost:3000/events'; 

  constructor(private http: HttpClient) {}

 
  getEventsByHost(hostId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}?userId=${hostId}`);
  }

  
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  }

  
  verifyEventCode(code: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?code=${code}`);
  }
}
