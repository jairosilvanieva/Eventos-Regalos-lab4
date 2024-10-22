import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { AuthService } from '../../services/auth.service';
import { Event } from '../../interfaces';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  // Declaración de propiedades del componente para almacenar datos del evento y lista de eventos
  date: string = '';
  description: string = '';
  eventId: string = '';
  events: Event[] = [];
  eventType: string = '';
  location: string = '';
  time: string = '';
  userId: string = '';

  constructor(
    private authService: AuthService,
    private eventsService: EventsService,
    private router: Router
  ) {}

  // Inicializa el componente y carga los eventos si hay un usuario autenticado
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';

    if (this.userId) {
      this.loadEvents();
    }
  }

  // Carga los eventos del usuario actual
  loadEvents(): void {
    this.eventsService.getEventsByHost(this.userId).subscribe((data: any[]) => {
      this.events = data;
    });
  }

  // Crea un nuevo evento
  createEvent() {
    const userId = this.authService.getUserId();
    if (userId) {
      const newEvent: Event = {
        id: this.generateUniqueId(),
        eventType: this.eventType,
        location: this.location,
        date: this.date,
        time: this.time,
        description: this.description,
        code: this.generateUniqueCode(),
        userId: userId,
      };

      this.eventsService.createEvent(newEvent).subscribe({
        next: () => {
          alert('Event successfully created');
          this.loadEvents();
        },
        error: (error: any) => {
          console.error('Error creating event:', error);
          alert('Error creating event');
        },
      });
    }
  }

  // Genera un ID único para un nuevo evento
  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Genera un código único para un nuevo evento
  generateUniqueCode(): string {
    let uniqueCode = '';
    let codeExists = true;

    while (codeExists) {
      uniqueCode = Math.random().toString(36).substr(2, 8).toUpperCase();
      codeExists = this.events.some((event) => event.code === uniqueCode);
    }

    return uniqueCode;
  }

  // Navega a la página de selección de regalos para un evento específico
  selectGifts(eventId: string) {
    this.router.navigate(['/events', eventId, 'gifts']);
  }

  // Cierra la sesión del usuario actual
  logout() {
    this.authService.logout();
  }
}
