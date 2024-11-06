import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { AuthService } from '../../services/auth.service';
import { Event } from 'app/interfaces/event.interface';






@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  
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

  
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';

    if (this.userId) {
      this.loadEvents();
    }
  }

 
  loadEvents(): void {
    this.eventsService.getEventsByHost(this.userId).subscribe((data: any[]) => {
      this.events = data;
    });
  }

  
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

  
  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  
  generateUniqueCode(): string {
    let uniqueCode = '';
    let codeExists = true;

    while (codeExists) {
      uniqueCode = Math.random().toString(36).substr(2, 8).toUpperCase();
      codeExists = this.events.some((event) => event.code === uniqueCode);
    }

    return uniqueCode;
  }

  
  selectGifts(eventId: string) {
    this.router.navigate(['/events', eventId, 'gifts']);
  }

  
  logout() {
    this.authService.logout();
  }
}
