import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  
  registrarUsuario() {
    const newUser = {
      name: this.nombre,
      email: this.email,
      password: this.password,
    };

   
    this.authService.registerUser(newUser).subscribe({
      next: () => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrar el usuario:', error);
      }
    });
  }
}
