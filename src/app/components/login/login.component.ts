import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Propiedades para almacenar el correo electrónico y la contraseña
  email: string = '';
  password: string = '';

  // Constructor con inyección de dependencias
  constructor(private router: Router, private authService: AuthService) {}

  // Método para manejar el inicio de sesión
  login() {
    // Llamada al servicio de autenticación
    this.authService.login(this.email, this.password).subscribe((userId) => {
      if (userId) {
        // Si se recibe un userId, el inicio de sesión fue exitoso
        this.authService.saveSession(userId);
        // Redirigir al usuario a la página de eventos
        this.router.navigate(['/events']);
      } else {
        // Si no hay userId, las credenciales son incorrectas
        alert('Credenciales incorrectas');
      }
    });
  }
}
