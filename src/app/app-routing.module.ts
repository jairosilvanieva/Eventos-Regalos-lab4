import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { GiftListComponent } from './components/gift-list/gift-list.component';
import { GuestComponent } from './components/guest/guest.component';
import { LoginComponent } from './components/login/login.component';
import { GuestMenuComponent } from './components/guest-menu/guest-menu.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { UnauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [UnauthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [UnauthGuard] },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'events/:eventId/gifts', component: GiftListComponent, canActivate: [AuthGuard] },
  { path: 'guest', component: GuestComponent, canActivate: [UnauthGuard] },
  { path: 'guest/events/:eventId/gifts', component: GuestMenuComponent, canActivate: [GuestGuard] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
