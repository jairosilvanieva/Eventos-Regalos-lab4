import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Título de la aplicación
  title = 'lista-regalos';

  // Constructor con inyección de dependencias
  constructor(private authService: AuthService, private router: Router) {}

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Método para cerrar sesión
  logout() {
    // Llama al método logout del servicio de autenticación
    this.authService.logout();
    // Redirige al usuario a la página principal
    this.router.navigate(['/']);
  }
}
