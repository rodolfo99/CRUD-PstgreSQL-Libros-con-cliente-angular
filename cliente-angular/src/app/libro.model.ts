export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anio: number | null;
}

export interface LibroForm {
  titulo: string;
  autor: string;
  anio: number | null;
}

export interface Pagina<T> {
  contenido: T[];
  pagina: number;
  tamanio: number;
  totalElementos: number;
  totalPaginas: number;
}
