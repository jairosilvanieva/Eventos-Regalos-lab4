import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        const isGuest = localStorage.getItem('nombreInvitado') !== null;
        if (isGuest) {
            return true;
        } else {
            this.router.navigate(['/guest']);
            return false;
        }
    }
}
