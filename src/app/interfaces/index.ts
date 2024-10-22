// Interfaz para representar a un usuario
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  events: any[]; // Array de eventos asociados al usuario
}

// Interfaz para representar un evento
export interface Event {
  id: string;
  eventType: string;
  location: string;
  date: string;
  time: string;
  description: string;
  code: string;
  userId: string; // ID del usuario que creó el evento
}

// Interfaz para representar un regalo
export interface Gift {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  eventId: string; // ID del evento al que está asociado el regalo
}
