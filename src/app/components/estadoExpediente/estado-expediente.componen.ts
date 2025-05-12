import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

interface Historial {
  titulo: string;
  descripcion: string;
  fecha: Date;
}

interface Expediente {
  id: string;
  historial: Historial[];
  estado: string; // Estado del expediente 
}

@Injectable({
  providedIn: 'root',
})
export class EstadoExpedienteService {
  constructor(private http: HttpClient) {}

  /**
   * Método para obtener el estado y el historial de un expediente
   * @param clienteId ID del cliente
   * @param expedienteId ID del expediente
   * @returns Observable con la respuesta del servidor
   */
  getEstadoExpediente(clienteId: string, expedienteId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      return; // Verifica el token si no hay, la solucitud no se hace . 
    }

    // Hacer la solicitud GET a la API para obtener los datos del expediente y el historial
    return this.http.get(`${environment.apiUrl}/clientes/${clienteId}/expedientes/${expedienteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
