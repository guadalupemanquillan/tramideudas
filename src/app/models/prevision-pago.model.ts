export interface PrevisionPago {
    expediente: string;
    cliente: string;
    reembolsado: boolean;
    pagado: boolean;
    error: boolean;
    emailEnviado: boolean;
    importe: number;
    historialIntentos: string[];
    fechaPrevista: string;
    titulo: string;
    createdAt: string;
    importeProcurador: number;
    pagadoAlProcurador: boolean;
    fechaPagoAlProcurador: string | null;
  }
  