import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GiftsService } from '../../services/gifts.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css'],
})
export class GuestComponent {
  // Propiedades para almacenar los datos del invitado y el código del evento
  eventCode: string = '';
  nombreInvitado: string = '';
  apellidoInvitado: string = '';
  dniInvitado: string = '';

  constructor(private giftsService: GiftsService, private router: Router) {}

  // Método para procesar el ingreso de un invitado
  ingresarComoInvitado() {
    // Verificar el código del evento
    this.giftsService.verifyEventCode(this.eventCode).subscribe(
      (eventos: any[]) => {
        if (eventos.length > 0) {
          const evento = eventos[0];
          // Crear objeto con los datos del invitado
          const invitado = {
            nombre: this.nombreInvitado,
            apellido: this.apellidoInvitado,
            dni: this.dniInvitado,
            eventId: evento.id,
          };

          // Registrar al invitado
          this.giftsService.registerGuest(invitado).subscribe(
            () => {
              // Guardar el código del evento en el almacenamiento local
              localStorage.setItem('eventCode', this.eventCode);
              // Redirigir al invitado a la página de regalos
              this.router.navigate(['/guest/events', this.eventCode, 'gifts']);
            },
            (error: any) => {
              console.error('Error al registrar el invitado:', error);
            }
          );
        } else {
          // Mostrar alerta si el código del evento no es válido
          alert('Código de evento no válido');
        }
      },
      (error: any) => {
        console.error('Error al verificar el código del evento:', error);
      }
    );
  }
}
