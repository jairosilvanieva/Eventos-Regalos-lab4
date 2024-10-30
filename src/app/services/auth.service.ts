import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators'; 
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient, private router: Router) {}

  
  login(email: string, password: string): Observable<string | null> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users: any[]) => {
        const user = users.find((u: any) => u.email === email && u.password === password);
        return user ? user.id : null;
      }),
      catchError(() => of(null))
    );
  }

 
  saveSession(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  
  logout(): void {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

 
  isAuthenticated(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, user);
  }
}
