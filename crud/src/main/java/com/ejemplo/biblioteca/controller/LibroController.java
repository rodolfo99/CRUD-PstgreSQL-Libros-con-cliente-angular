package com.ejemplo.biblioteca.controller;

import com.ejemplo.biblioteca.dto.Pagina;
import com.ejemplo.biblioteca.modelo.Libro;
import com.ejemplo.biblioteca.service.LibroService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "http://localhost:4200")
public class LibroController {

    private final LibroService service;

    public LibroController(LibroService service) {
        this.service = service;
    }

    @GetMapping
    public Pagina<Libro> listar(
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanio,
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) String autor
    ) {
        return service.listar(
                pagina,
                tamanio,
                titulo,
                autor
        );
    }

    @GetMapping("/{id}")
    public Libro buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Libro crear(@RequestBody Libro libro) {
        return service.crear(libro);
    }

    @PutMapping("/{id}")
    public Libro actualizar(
            @PathVariable Long id,
            @RequestBody Libro libro
    ) {
        return service.actualizar(id, libro);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}
