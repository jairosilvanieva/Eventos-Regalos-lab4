import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { GiftsService } from '../../services/gifts.service';
import { Event, Gift } from '../../interfaces';

@Component({
  selector: 'app-guest-menu',
  templateUrl: './guest-menu.component.html',
  styleUrls: ['./guest-menu.component.css'],
})
export class GuestMenuComponent implements OnInit {
  // Objeto para almacenar los datos del evento
  event: Event = {
    id: '',
    eventType: '',
    location: '',
    date: '',
    time: '',
    description: '',
    code: '',
    userId: ''
  };
  // Array para almacenar los regalos asociados al evento
  gifts: Gift[] = [];

  constructor(
    private eventsService: EventsService,
    private giftsService: GiftsService,
  ) {}

  ngOnInit(): void {
    // Obtener el código del evento del almacenamiento local
    const eventCode = localStorage.getItem('eventCode');
    if (eventCode) {
      this.loadEvent(eventCode);
    }
  }

  // Cargar los datos del evento usando el código
  loadEvent(code: string): void {
    this.eventsService.verifyEventCode(code).subscribe((events: any[]) => {
      if (events.length > 0) {
        this.event = events[0];
        this.loadGifts(this.event.id); // Cargar regalos asociados al evento
      } else {
        alert('Evento no encontrado');
      }
    });
  }

  // Cargar los regalos asociados al evento
  loadGifts(eventId: string): void {
    this.giftsService.getGiftsByEvent(eventId).subscribe((gifts: any[]) => {
      this.gifts = gifts;
    });
  }

  // Seleccionar un regalo
  selectGift(gift: any): void {
    if (!gift.isSelected) {
      gift.isSelected = true;
      this.giftsService.updateGift(gift).subscribe(() => {
        alert('Regalo seleccionado exitosamente');
      });
    } else {
      alert('Este regalo ya ha sido seleccionado.');
    }
  }
}
