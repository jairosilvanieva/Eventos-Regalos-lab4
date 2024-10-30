import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  
  email: string = '';
  password: string = '';

  
  constructor(private router: Router, private authService: AuthService) {}

  
  login() {
    
    this.authService.login(this.email, this.password).subscribe((userId) => {
      if (userId) {
        
        this.authService.saveSession(userId);
        
        this.router.navigate(['/events']);
      } else {
        
        alert('Credenciales incorrectas');
      }
    });
  }
}
