package com.ejemplo.biblioteca.repository;

import com.ejemplo.biblioteca.modelo.Libro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibroRepository extends JpaRepository<Libro, Long> {

    Page<Libro> findByTituloContainingIgnoreCase(
            String titulo,
            Pageable pageable
    );

    Page<Libro> findByAutorContainingIgnoreCase(
            String autor,
            Pageable pageable
    );
}
