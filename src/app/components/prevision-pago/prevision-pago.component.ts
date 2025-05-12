import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-prevision-pago',
  templateUrl: './prevision-pago.component.html',
  standalone: false
})
export class PrevisionPagoComponent implements OnInit {
  previsionSeleccionada: any = null;
  modalAbierto: boolean = false; 
  test =  '1234';
  previsiones = [
    {
      titulo: 'Pago inicial',
      expediente: '644a1f9c8d1f9b3d7a5f1234',
      cliente: '644a1f9c8d1f9b3d7a5f5678',
      importe: 1200.50,
      fechaPrevista: '2025-05-31',
      pagado: false,
      reembolsado: false,
      emailEnviado: false,
      error: false
    },
    
    {
      titulo: 'Pago final',
      expediente: '644a1f9c8d1f9b3d7a5f2234',
      cliente: '644a1f9c8d1f9b3d7a5f6678',
      importe: 3500.00,
      fechaPrevista: '2025-05-09',
      pagado: true,
      reembolsado: true,
      emailEnviado: true,
      error: false
    },  
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
    {
      expediente: "644a1f9c8d1f9b3d7a5f2234",
      cliente: "644a1f9c8d1f9b3d7a5f6678",
      reembolsado: true,
      pagado: true,
      error: false,
      emailEnviado: true,
      importe: 3500,
      historialIntentos: ["2025-04-20T15:00:00Z"],
      fechaPrevista: "2025-05-10T00:00:00Z",
      titulo: "Pago final",
      createdAt: "2025-04-01T12:00:00Z",
      importeProcurador: 500,
      pagadoAlProcurador: true,
      fechaPagoAlProcurador: "2025-04-25T10:00:00Z"
    },
    {
      expediente: "644a1f9c8d1f9b3d7a5f3234",
      cliente: "644a1f9c8d1f9b3d7a5f7678",
      reembolsado: false,
      pagado: true,
      error: false,
      emailEnviado: true,
      importe: 2100,
      historialIntentos: ["2025-04-11T11:00:00Z", "2025-04-12T13:00:00Z"],
      fechaPrevista: "2025-05-05T00:00:00Z",
      titulo: "Pago segunda cuota",
      createdAt: "2025-03-28T08:30:00Z",
      importeProcurador: 300,
      pagadoAlProcurador: false,
      fechaPagoAlProcurador: null
    },
    {
      expediente: "644a1f9c8d1f9b3d7a5f4234",
      cliente: "644a1f9c8d1f9b3d7a5f8678",
      reembolsado: false,
      pagado: false,
      error: true,
      emailEnviado: false,
      importe: 1800,
      historialIntentos: ["2025-04-29T14:00:00Z"],
      fechaPrevista: "2025-05-20T00:00:00Z",
      titulo: "Revisión de pago",
      createdAt: "2025-04-15T17:00:00Z",
      importeProcurador: 250,
      pagadoAlProcurador: false,
      fechaPagoAlProcurador: null
    },
    {
      expediente: "644a1f9c8d1f9b3d7a5f5234",
      cliente: "644a1f9c8d1f9b3d7a5f9678",
      reembolsado: true,
      pagado: true,
      error: false,
      emailEnviado: true,
      importe: 5000,
      historialIntentos: [],
      fechaPrevista: "2025-06-15T00:00:00Z",
      titulo: "Anticipo extraordinario",
      createdAt: "2025-04-10T09:00:00Z",
      importeProcurador: 750,
      pagadoAlProcurador: true,
      fechaPagoAlProcurador: "2025-04-20T09:00:00Z"
    },
    {
      expediente: "644a1f9c8d1f9b3d7a5f6234",
      cliente: "644a1f9c8d1f9b3d7a5fa678",
      reembolsado: false,
      pagado: false,
      error: false,
      emailEnviado: false,
      importe: 900,
      historialIntentos: ["2025-05-01T09:00:00Z", "2025-05-03T09:00:00Z"],
      fechaPrevista: "2025-05-15T00:00:00Z",
      titulo: "Pago parcial",
      createdAt: "2025-04-18T10:00:00Z",
      importeProcurador: 100,
      pagadoAlProcurador: false,
      fechaPagoAlProcurador: null
    },
    {
      expediente: "644a1f9c8d1f9b3d7a5f7234",
      cliente: "644a1f9c8d1f9b3d7a5fb678",
      reembolsado: false,
      pagado: false,
      error: true,
      emailEnviado: false,
      importe: 1300,
      historialIntentos: ["2025-04-30T16:00:00Z"],
      fechaPrevista: "2025-06-01T00:00:00Z",
      titulo: "Fallo de transferencia",
      createdAt: "2025-04-20T10:00:00Z",
      importeProcurador: 200,
      pagadoAlProcurador: false,
      fechaPagoAlProcurador: null
    },
    {
      expediente: "644a1f9c8d1f9b3d7a5f8234",
      cliente: "644a1f9c8d1f9b3d7a5fc678",
      reembolsado: true,
      pagado: true,
      error: false,
      emailEnviado: true,
      importe: 2200,
      historialIntentos: [],
      fechaPrevista: "2025-05-22T00:00:00Z",
      titulo: "Pago ordinario",
      createdAt: "2025-04-05T11:00:00Z",
      importeProcurador: 350,
      pagadoAlProcurador: true,
      fechaPagoAlProcurador: "2025-04-30T10:00:00Z"
    },
    {
      expediente: "644a1f9c8d1f9b3d7a5f9234",
      cliente: "644a1f9c8d1f9b3d7a5fd678",
      reembolsado: false,
      pagado: false,
      error: false,
      emailEnviado: false,
      importe: 1600,
      historialIntentos: [],
      fechaPrevista: "2025-06-10T00:00:00Z",
      titulo: "Cuota pendiente",
      createdAt: "2025-04-22T13:00:00Z",
      importeProcurador: 180,
      pagadoAlProcurador: false,
      fechaPagoAlProcurador: null
    }

  ];

  constructor(
  ) {
    
  }

  async ngOnInit() {
  }

  pagarPrevision(prevision: any) {
    Swal.fire({
      title: `Pagar previsión ${prevision.titulo}`,
      text: `¿Estás seguro de que deseas pagar la previsión por ${prevision.importe} €?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Pagar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Pagado!', 'El pago ha sido realizado.', 'success');
      }
    });
  }

  verDetallesModal(prevision: any) {
    console.log("A");
    
    this.previsionSeleccionada = prevision; 
    this.modalAbierto = true; 
  }

  // Función para cerrar el modal
  cerrarModal() {
    this.modalAbierto = false;
    this.previsionSeleccionada = null;
  }

  mostrarError(prevision: any) {
    Swal.fire({
      title: 'Error',
      text: `Se ha producido un error con la previsión: ${prevision.titulo}`,
      icon: 'error',
      confirmButtonText: 'Close'
    });
  }
}

