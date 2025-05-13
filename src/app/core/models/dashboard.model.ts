export interface Cliente {
  name: string;
  lastname: string;
  identityDocument: string;
}

export interface PlanDePago {
  pagoMensual: number;
  mesesTotales: number;
  mesesPlan: number;
  deudaFinal: number;
}

export interface CuentaNegociacion {
  planDePago: PlanDePago;
}

export interface Deuda {
  estado: string;
  _id: string;
}

export interface Movimiento {
  createdAt: string;
  monto: number;
  tipo: string;
  comentario: string;
}

export interface Cuota {
  estado: string;
  monto: number;
  fechaPrevista: string;
  numero?: number;
}