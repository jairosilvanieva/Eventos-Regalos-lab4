
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  events: any[]; 
}


export interface Event {
  id: string;
  eventType: string;
  location: string;
  date: string;
  time: string;
  description: string;
  code: string;
  userId: string; 
}


export interface Gift {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  eventId: string;
  permalink?: string; 
  selectedBy?: {
    nombre: string;
    apellido: string;
    dni: string;
  };
}

