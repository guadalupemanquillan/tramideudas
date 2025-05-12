//import { NotificacionesService } from './notificaciones.service';
//import { Notificacion } from './notificaciones';

@Component({
  selector: 'app-notificaciones-importantes',
  templateUrl: './notificaciones-importantes.component.html',
})
export class NotificacionesImportantesComponent implements OnInit {
  notificacionesImportantes: Notificacion[] = [];

  constructor(private notificacionesService: NotificacionesService) {}

  ngOnInit() {
    this.loadNotificacionesImportantes();
  }

  /**
   * Método para cargar las notificaciones importantes
   */
  loadNotificacionesImportantes() {
    this.notificacionesService.obtenerNotificaciones().subscribe({
      next: (response: Notificacion[]) => {
        // Filtramos las notificaciones para obtener solo las importantes
        this.notificacionesImportantes = response.filter(notificacion => notificacion.importante);
      },
  //    error: (error) => {
  //     console.error('Error al obtener las notificaciones importantes:', error);
  //    },
  //   });
  // }

  /**
   * Método para marcar una notificación como leída
   * @param id ID de la notificación
   */
  marcarLeida(id: string) {
    this.notificacionesService.marcarComoLeida(id).subscribe({
      next: (response: Notificacion) => {
        // Actualizamos el estado de la notificación a 'leida' en el array local
        const index = this.notificacionesImportantes.findIndex(n => n.id === id);
        if (index !== -1) {
          this.notificacionesImportantes[index].estado = 'leida';
        }
      },
 //     error: (error) => {
        console.error('Error al marcar la notificación como leída:', error);
//    },
  //  });
  }
//}
