import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Cliente {
  name: string;
  lastname: string;
  identityDocument: string;
}

interface PlanDePago {
  pagoMensual: number;
  mesesTotales: number;
  mesesPlan: number;
  deudaFinal: number;
}

interface CuentaNegociacion {
  planDePago: PlanDePago;
}

interface Deuda {
  estado: string;
  _id: string;
}

interface Movimiento {
  createdAt: string;
  monto: number;
  tipo: string;
  comentario: string;
}

interface Cuota {
  estado: string;
  monto: number;
  fechaPrevista: string;
  numero?: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  userDisplayName: string = '';
  userDni: string = '';
  cuentaNegociacion: CuentaNegociacion | null = null;
  deudas: Deuda[] = [];
  movimientos: Movimiento[] = [];
  proximaCuota: Cuota | null = null;
  cuotasPendientes: Cuota[] = [];
  todasLasCuotas: Cuota[] = [];

  get deudasPagadas(): number {
    return this.deudas.filter((d) => d.estado === 'pagada').length;
  }

  get deudasEnProceso(): number {
    return this.deudas.filter((d) => d.estado === 'en_proceso_pago').length;
  }

  get mesesRestantes(): number {
    return this.cuotasPendientes.length;
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadClientData();
  }

  private loadClientData() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http
      .get(`${environment.apiUrl}/clientes/enviarInfoCliente/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .subscribe({
        next: (response: any) => {
          this.userDisplayName = `${response.cliente.name} ${response.cliente.lastname}`;
          this.userDni = response.cliente.identityDocument;
          this.cuentaNegociacion = response.cuentaNegociacion;
          this.deudas = response.deudas;
          this.movimientos = response.cuentaMovimiento;

          // Depuración: imprimir los tipos de movimientos
          console.log(
            'Tipos de movimientos:',
            this.movimientos.map((m) => m.tipo)
          );

          if (response.cuotas && response.cuotas.length > 0) {
            this.todasLasCuotas = response.cuotas
              .sort(
                (a: Cuota, b: Cuota) =>
                  new Date(a.fechaPrevista).getTime() -
                  new Date(b.fechaPrevista).getTime()
              )
              .map((cuota: Cuota, index: number) => ({
                ...cuota,
                numero: index + 1,
              }));

            this.cuotasPendientes = this.todasLasCuotas.filter(
              (cuota: Cuota) => cuota.estado === 'pendiente'
            );

            this.proximaCuota =
              this.cuotasPendientes.length > 0
                ? this.cuotasPendientes[0]
                : null;
          }
        },
        error: (error) => {
          console.error('Error al cargar los datos del cliente:', error);
        },
      });
  }
}
