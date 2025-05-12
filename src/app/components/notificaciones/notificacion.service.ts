import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Notificacion {
  titulo: string;
  descripcion: string;
  departamento: string;
  createdAt: string;
  estado: 'leida' | 'no leida';
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private notificacionesMock: Notificacion[] = [
    {
      "titulo": "Actualización de política de privacidad",
      "descripcion": "Se ha actualizado nuestra política de privacidad. Por favor, revísala.",
      "departamento": "Legal",
      "createdAt": "2025-05-01T10:45:00Z",
      "estado": "no leida"
    },
    {
      "titulo": "Mantenimiento programado",
      "descripcion": "Habrá una interrupción del servicio este domingo de 2 a 4 AM.",
      "departamento": "IT",
      "createdAt": "2025-05-03T08:15:00Z",
      "estado": "leida"
    }
  ];

  constructor() {}

  getNotificacionesImportantes(): Observable<Notificacion[]> {
    // va a Devolver un observable con las notificaciones mock
    return of(this.notificacionesMock);
  }

  marcarNotificacionComoLeida(titulo: string): Observable<Notificacion[]> {
    // Encuentra la notificación por título y cambia su estado
    const index = this.notificacionesMock.findIndex(n => n.titulo === titulo);
    if (index !== -1) {
      this.notificacionesMock[index].estado = 'leida';
    }
    return of(this.notificacionesMock);
  }
}