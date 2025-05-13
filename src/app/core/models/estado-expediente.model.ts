interface Historial {
  titulo: string;
  descripcion: string;
  fecha: Date;
}

export interface Expediente {
  id: string;
  historial: Historial[];
  estado: string; // Estado del expediente 
}