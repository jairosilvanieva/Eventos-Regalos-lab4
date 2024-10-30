import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GiftsService } from '../../services/gifts.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css'],
})
export class GuestComponent {
  eventCode: string = '';
  nombreInvitado: string = '';
  apellidoInvitado: string = '';
  dniInvitado: string = '';

  constructor(private giftsService: GiftsService, private router: Router) {}

  
  ingresarComoInvitado() {
    this.giftsService.verifyEventCode(this.eventCode).subscribe(
      (eventos: any[]) => {
        if (eventos.length > 0) {
          const evento = eventos[0];
          const invitado = {
            nombre: this.nombreInvitado,
            apellido: this.apellidoInvitado,
            dni: this.dniInvitado,
            eventId: evento.id,
          };

          
          this.giftsService.verifyGuest(invitado).subscribe((guests: any[]) => {
            if (guests.length === 0) {
              
              this.giftsService.registerGuest(invitado).subscribe(() => {
                this.onSuccessfulGuestRegistration();
              });
            } else {
              
              this.onSuccessfulGuestRegistration();
            }
          });
        } else {
          alert('Código de evento no válido');
        }
      },
      (error: any) => {
        console.error('Error al verificar el código del evento:', error);
      }
    );
  }

  onSuccessfulGuestRegistration(): void {
    
    localStorage.setItem('nombreInvitado', this.nombreInvitado);
    localStorage.setItem('apellidoInvitado', this.apellidoInvitado);
    localStorage.setItem('dniInvitado', this.dniInvitado);
    localStorage.setItem('eventCode', this.eventCode);
    
    this.router.navigate(['/guest/events', this.eventCode, 'gifts']);
  }
}
