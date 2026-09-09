package com.ejemplo.biblioteca.service;

import com.ejemplo.biblioteca.dto.Pagina;
import com.ejemplo.biblioteca.modelo.Libro;
import com.ejemplo.biblioteca.repository.LibroRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class LibroService {

    private final LibroRepository repository;

    public LibroService(LibroRepository repository) {
        this.repository = repository;
    }

    public Pagina<Libro> listar(
            int pagina,
            int tamanio,
            String titulo,
            String autor
    ) {
        Pageable pageable = PageRequest.of(
                pagina,
                tamanio,
                Sort.by("id")
        );

        boolean porTitulo = titulo != null && !titulo.isBlank();
        boolean porAutor = autor != null && !autor.isBlank();

        if (porTitulo) {
            return Pagina.de(
                    repository.findByTituloContainingIgnoreCase(
                            titulo.trim(),
                            pageable
                    )
            );
        }

        if (porAutor) {
            return Pagina.de(
                    repository.findByAutorContainingIgnoreCase(
                            autor.trim(),
                            pageable
                    )
            );
        }

        return Pagina.de(repository.findAll(pageable));
    }

    public Libro buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Libro no encontrado: " + id)
                );
    }

    public Libro crear(Libro libro) {
        libro.setId(null);
        return repository.save(libro);
    }

    public Libro actualizar(Long id, Libro datos) {
        Libro libro = buscarPorId(id);

        libro.setTitulo(datos.getTitulo());
        libro.setAutor(datos.getAutor());
        libro.setAnio(datos.getAnio());

        return repository.save(libro);
    }

    public void eliminar(Long id) {
        Libro libro = buscarPorId(id);
        repository.delete(libro);
    }
}
