import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // Propiedades para almacenar los datos del formulario
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para manejar el registro de usuarios
  register(): void {
    // Crear un nuevo objeto de usuario con los datos del formulario
    const newUser: User = {
      id: this.generateUniqueId(),
      name: this.name,
      email: this.email,
      password: this.password,
      events: [],
    };

    // Llamar al servicio de autenticación para registrar al usuario
    this.authService.registerUser(newUser).subscribe({
      next: () => {
        // Redirigir al usuario a la página de inicio de sesión después del registro exitoso
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        // Manejar errores durante el registro
        console.error('Error al registrar el usuario:', error);
      },
    });
  }

  // Método para generar un ID único para el usuario
  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
