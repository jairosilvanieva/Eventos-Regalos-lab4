import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UnauthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        const isAuthenticated = this.authService.isAuthenticated();
        const isGuest = localStorage.getItem('nombreInvitado') !== null;

        if (isAuthenticated) {
            this.router.navigate(['/events']);
            return false;
        } else if (isGuest) {
            // Si es invitado, lo mandamos a su lista (o podrías dejarlo entrar a login si quiere cambiarse)
            // Por ahora, si está "dentro" de algo, no debería ir a login/register
            return true;
        }

        return true;
    }
}
