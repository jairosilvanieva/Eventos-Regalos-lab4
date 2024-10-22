import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // URL donde se encuentra la lista de usuarios

  constructor(private http: HttpClient, private router: Router) {}

  // Iniciar sesión obteniendo el usuario desde el backend
  login(email: string, password: string): Observable<string | null> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        return user ? user.id : null;
      }),
      catchError(() => of(null)) // En caso de error, devolver null
    );
  }

  // Almacenar el userId
  saveSession(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  // Obtener el ID del usuario actual
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  // Registrar un nuevo usuario
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, user);
  }
}
