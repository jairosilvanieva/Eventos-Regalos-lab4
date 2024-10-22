import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importaciones de los componentes
import { EventsComponent } from './components/events/events.component';
import { GiftListComponent } from './components/gift-list/gift-list.component';
import { GuestComponent } from './components/guest/guest.component';
import { LoginComponent } from './components/login/login.component';
import { GuestMenuComponent } from './components/guest-menu/guest-menu.component';
import { RegisterComponent } from './components/register/register.component';

// Definición de las rutas de la aplicación
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login por defecto
  { path: 'events', component: EventsComponent },
  { path: 'events/:eventId/gifts', component: GiftListComponent }, // Ruta con parámetro
  { path: 'guest', component: GuestComponent },
  { path: 'guest/events/:eventId/gifts', component: GuestMenuComponent }, // Ruta anidada con parámetro
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura el enrutador con las rutas definidas
  exports: [RouterModule], // Exporta RouterModule para su uso en otros módulos
})
export class AppRoutingModule {} // Módulo de enrutamiento principal de la aplicación
