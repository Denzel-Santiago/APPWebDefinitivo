export interface Resena {
    id?: number; // Opcional al crear una nueva reseña
    comic_id: number;
    usuario: string;
    contenido: string;
    calificacion: number;
    fecha?: string; 
  }