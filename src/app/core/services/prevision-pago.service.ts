import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PrevisionPago } from '../models/prevision-pago.model';

@Injectable({
  providedIn: 'root'
})
export class PrevisionPagoService {

  // Mock de los datos 
  private previsionesMock: PrevisionPago[] = [
    {
      expediente: "644a1f9c8d1f9b3d7a5f1234",
      cliente: "644a1f9c8d1f9b3d7a5f5678",
      reembolsado: false,
      pagado: false,
      error: false,
      emailEnviado: false,
      importe: 1200.5,
      historialIntentos: ["2025-05-01T10:00:00Z"],
      fechaPrevista: "2025-06-01T00:00:00Z",
      titulo: "Pago inicial",
      createdAt: "2025-04-15T10:00:00Z",
      importeProcurador: 200,
      pagadoAlProcurador: false,
      fechaPagoAlProcurador: null
    },
    // Aca se deben agregar el resto de la previsiones 
  ];

  constructor() { }

  // Método que va a devolver las previsiones mock
  getPrevisiones(): Observable<PrevisionPago[]> {
    return of(this.previsionesMock);
  }
}
