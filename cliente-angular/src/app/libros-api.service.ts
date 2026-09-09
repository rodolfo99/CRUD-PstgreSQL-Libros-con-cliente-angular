import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Libro,
  LibroForm,
  Pagina
} from './libro.model';

@Injectable({
  providedIn: 'root'
})
export class LibrosApiService {

  private readonly url = '/api/libros';

  constructor(private readonly http: HttpClient) {}

  listar(
    pagina: number,
    tamanio: number,
    filtro: 'titulo' | 'autor',
    texto: string
  ): Observable<Pagina<Libro>> {

    let params = new HttpParams()
      .set('pagina', pagina)
      .set('tamanio', tamanio);

    const valor = texto.trim();

    if (valor) {
      params = params.set(filtro, valor);
    }

    return this.http.get<Pagina<Libro>>(
      this.url,
      { params }
    );
  }

  crear(libro: LibroForm): Observable<Libro> {
    return this.http.post<Libro>(
      this.url,
      libro
    );
  }

  actualizar(
    id: number,
    libro: LibroForm
  ): Observable<Libro> {

    return this.http.put<Libro>(
      `${this.url}/${id}`,
      libro
    );
  }

  eliminar(
    id: number
  ): Observable<HttpResponse<void>> {

    return this.http.delete<void>(
      `${this.url}/${id}`,
      {
        observe: 'response'
      }
    );
  }
}
