import { Component, OnInit } from '@angular/core';
import { NotificacionService } from 'src/app/core/services/notificacion.service';

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
  standalone: false
})
export class NotificacionesComponent implements OnInit {
  notificacionesImportantes: Notificacion[] = [];
  mostrarNotificaciones: boolean = false;

  constructor(private notificacionService: NotificacionService) {}

  ngOnInit(): void {
    this.cargarNotificacionesImportantes();
  }

  cargarNotificacionesImportantes(): void {
    this.notificacionService.getNotificacionesImportantes().subscribe(
      (notificaciones: Notificacion[]) => {
        // Filtrar solo las notificaciones no leídas
        this.notificacionesImportantes = notificaciones.filter(n => n.estado === 'no leida');
      },
      (error) => {
        console.error('Error al cargar notificaciones', error);
      }
    );
  }

  toggleNotificaciones(): void {
    this.mostrarNotificaciones = !this.mostrarNotificaciones;
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
