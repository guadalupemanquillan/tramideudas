import { Component, OnInit } from '@angular/core';
import { NotificacionService } from './notificacion.service';
import { CommonModule } from '@angular/common'; 


interface Notificacion {
  titulo: string;
  descripcion: string;
  departamento: string;
  createdAt: string; 
  estado: 'leida' | 'no leida';
}

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
})
export class NotificacionesComponent implements OnInit {
  notificacionesImportantes: Notificacion[] = [];

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.cargarNotificacionesImportantes();
  }

  cargarNotificacionesImportantes(): void {
    this.notificacionService.getNotificacionesImportantes().subscribe(
      (notificaciones: Notificacion[]) => {
        // Para iltrar solo notificaciones no leídas
        this.notificacionesImportantes = notificaciones.filter(n => n.estado === 'no leida');
      },
      (error) => {
        console.error('Error al cargar notificaciones', error);
      }
    );
  }

  marcarLeida(titulo: string): void {
    this.notificacionService.marcarNotificacionComoLeida(titulo).subscribe(
      (notificaciones) => {
        // Actualizar la lista de notificaciones importantes
        this.notificacionesImportantes = notificaciones.filter(n => n.estado === 'no leida');
      },
      (error) => {
        console.error('Error al marcar notificación como leída', error);
      }
    );
  }
}
