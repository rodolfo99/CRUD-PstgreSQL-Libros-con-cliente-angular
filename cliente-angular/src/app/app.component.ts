import {
  Component,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Libro, LibroForm, Pagina } from './libro.model';
import { LibrosApiService } from './libros-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private readonly api = inject(LibrosApiService);

  readonly datos = signal<Pagina<Libro> | null>(null);
  readonly cargando = signal(false);
  readonly guardando = signal(false);
  readonly eliminandoId = signal<number | null>(null);
  readonly error = signal('');
  readonly mensaje = signal('');

  pagina = 0;
  tamanio = 10;

  filtro: 'titulo' | 'autor' = 'titulo';
  texto = '';

  mostrandoFormulario = false;
  editandoId: number | null = null;

  formulario: LibroForm = {
    titulo: '',
    autor: '',
    anio: null
  };

  constructor() {
    this.cargar();
  }

  cargar(): void {
    console.log(
      '[CATALOGO] GET /api/libros',
      {
        pagina: this.pagina,
        tamanio: this.tamanio,
        filtro: this.filtro,
        texto: this.texto
      }
    );

    this.cargando.set(true);
    this.error.set('');

    this.api.listar(
      this.pagina,
      this.tamanio,
      this.filtro,
      this.texto
    )
    .subscribe({
      next: datos => {
        console.log(
          '[CATALOGO] GET completado:',
          datos
        );

        this.datos.set(datos);
        this.cargando.set(false);
      },

      error: err => {
        console.error(
          '[CATALOGO] Error GET:',
          err
        );

        this.cargando.set(false);
        this.error.set(
          'No se pudo cargar el catálogo.'
        );
      }
    });
  }

  buscar(): void {
    this.pagina = 0;
    this.cargar();
  }

  limpiar(): void {
    this.texto = '';
    this.pagina = 0;
    this.cargar();
  }

  nuevo(): void {
    this.editandoId = null;

    this.formulario = {
      titulo: '',
      autor: '',
      anio: null
    };

    this.mostrandoFormulario = true;
  }

  editar(libro: Libro): void {
    this.editandoId = libro.id;

    this.formulario = {
      titulo: libro.titulo,
      autor: libro.autor,
      anio: libro.anio
    };

    this.mostrandoFormulario = true;
  }

  guardar(): void {
    if (this.guardando()) {
      return;
    }

    const payload: LibroForm = {
      titulo: this.formulario.titulo.trim(),
      autor: this.formulario.autor.trim(),
      anio: this.formulario.anio
    };

    if (!payload.titulo || !payload.autor) {
      this.error.set(
        'Título y autor son obligatorios.'
      );
      return;
    }

    this.guardando.set(true);
    this.error.set('');

    const id = this.editandoId;

    if (id === null) {

      console.log(
        '[CREAR] POST /api/libros',
        payload
      );

      this.api.crear(payload)
        .subscribe({
          next: creado => {
            console.log(
              '[CREAR] completado:',
              creado
            );

            this.guardando.set(false);
            this.mostrandoFormulario = false;
            this.editandoId = null;

            this.mensaje.set(
              'Libro creado correctamente.'
            );

            this.cargar();
          },

          error: err => {
            console.error(
              '[CREAR] error:',
              err
            );

            this.guardando.set(false);
            this.error.set(
              'No se pudo crear el libro.'
            );
          }
        });

      return;
    }

    console.log(
      `[ACTUALIZAR] PUT /api/libros/${id}`,
      payload
    );

    this.api.actualizar(
      id,
      payload
    )
    .subscribe({
      next: actualizado => {
        console.log(
          '[ACTUALIZAR] completado:',
          actualizado
        );

        this.guardando.set(false);
        this.mostrandoFormulario = false;
        this.editandoId = null;

        this.mensaje.set(
          'Libro actualizado correctamente.'
        );

        this.cargar();
      },

      error: err => {
        console.error(
          '[ACTUALIZAR] error:',
          err
        );

        this.guardando.set(false);
        this.error.set(
          'No se pudo actualizar el libro.'
        );
      }
    });
  }

  eliminarPorId(id: number, titulo: string): void {

    console.log(
      `[ELIMINAR] CLICK recibido. ID: ${id}, título: ${titulo}`
    );

    if (this.eliminandoId() !== null) {
      console.log(
        '[ELIMINAR] Ya existe una eliminación en curso.'
      );
      return;
    }

    this.error.set('');
    this.mensaje.set('');
    this.eliminandoId.set(id);

    console.log(
      `[ELIMINAR] DELETE /api/libros/${id}`
    );

    this.api.eliminar(id)
      .subscribe({
        next: respuesta => {

          console.log(
            `[ELIMINAR] DELETE terminado. ID: ${id}, HTTP: ${respuesta.status}`
          );

          this.eliminandoId.set(null);

          const contenidoActual =
            this.datos()?.contenido ?? [];

          if (
            contenidoActual.length === 1 &&
            this.pagina > 0
          ) {
            this.pagina--;
          }

          this.mensaje.set(
            `Libro "${titulo}" (ID ${id}) eliminado correctamente.`
          );

          console.log(
            '[ELIMINAR] Recargando catálogo'
          );

          this.cargar();
        },

        error: err => {

          console.error(
            `[ELIMINAR] Error DELETE para ID ${id}:`,
            err
          );

          this.eliminandoId.set(null);

          this.error.set(
            `No se pudo eliminar el libro "${titulo}" (ID ${id}).`
          );
        }
      });
  }

  anterior(): void {
    if (this.pagina <= 0) {
      return;
    }

    this.pagina--;
    this.cargar();
  }

  siguiente(): void {
    const datos = this.datos();

    if (
      datos &&
      this.pagina + 1 < datos.totalPaginas
    ) {
      this.pagina++;
      this.cargar();
    }
  }

  cambiarTamanio(): void {
    this.pagina = 0;
    this.cargar();
  }

  estaOcupado(): boolean {
    return (
      this.cargando() ||
      this.guardando() ||
      this.eliminandoId() !== null
    );
  }
}
