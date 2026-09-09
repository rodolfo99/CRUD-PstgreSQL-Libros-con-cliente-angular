# CRUD PostgreSQL con Spring Boot

Proyecto de ejemplo de un CRUD de libros usando:

- Java 21
- Spring Boot 3.5.3
- Spring Web
- Spring Data JPA
- PostgreSQL
- Docker Compose
- Maven

## 1. Levantar PostgreSQL con Docker Compose

Desde la raíz del proyecto:

```bash
docker compose up -d
```

Ver contenedores:

```bash
docker compose ps
```

Ver logs:

```bash
docker compose logs -f postgres
```

Detener PostgreSQL:

```bash
docker compose down
```

Detenerlo y borrar también los datos persistidos:

```bash
docker compose down -v
```

## 2. Datos de conexión

El contenedor crea automáticamente:

- Base de datos: `biblioteca`
- Usuario: `postgres`
- Contraseña: `postgres`
- Puerto: `5432`

La aplicación usa:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/biblioteca
spring.datasource.username=postgres
spring.datasource.password=postgres
```

## 3. Ejecutar Spring Boot

Con Maven:

```bash
mvn spring-boot:run
```

O:

```bash
./mvnw spring-boot:run
```

si posteriormente agregas el Maven Wrapper.

La API quedará disponible en:

```text
http://localhost:8080
```

## 4. Endpoints

### Listar

```http
GET /api/libros
```

Ejemplo:

```bash
curl http://localhost:8080/api/libros
```

### Paginación

```http
GET /api/libros?pagina=0&tamanio=5
```

```bash
curl "http://localhost:8080/api/libros?pagina=0&tamanio=5"
```

### Buscar por título

```http
GET /api/libros?titulo=spring
```

```bash
curl "http://localhost:8080/api/libros?titulo=spring"
```

### Buscar por autor

```http
GET /api/libros?autor=bloch
```

```bash
curl "http://localhost:8080/api/libros?autor=bloch"
```

### Buscar por ID

```http
GET /api/libros/{id}
```

```bash
curl http://localhost:8080/api/libros/1
```

### Crear libro

```http
POST /api/libros
Content-Type: application/json
```

```bash
curl -X POST http://localhost:8080/api/libros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Spring in Action",
    "autor": "Craig Walls",
    "anio": 2024
  }'
```

### Actualizar

```http
PUT /api/libros/{id}
Content-Type: application/json
```

```bash
curl -X PUT http://localhost:8080/api/libros/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Spring in Action actualizado",
    "autor": "Craig Walls",
    "anio": 2025
  }'
```

### Eliminar

```http
DELETE /api/libros/{id}
```

```bash
curl -X DELETE http://localhost:8080/api/libros/1
```

## 5. Flujo de paginación

La URL:

```text
/api/libros?pagina=0&tamanio=10
```

llega al `LibroController`.

Spring MVC convierte los parámetros usando:

```java
@RequestParam(defaultValue = "0") int pagina
@RequestParam(defaultValue = "10") int tamanio
```

Después el servicio construye:

```java
Pageable pageable = PageRequest.of(
    pagina,
    tamanio,
    Sort.by("id")
);
```

`PageRequest` no lee directamente la URL.

El Controller lee los parámetros HTTP y el Service construye el objeto `Pageable`.

## 6. Estructura

```text
crud-postgresql/
├── docker-compose.yml
├── pom.xml
├── README.md
└── src/
    └── main/
        ├── java/
        │   └── com/ejemplo/biblioteca/
        │       ├── CrudPostgresqlApplication.java
        │       ├── controller/
        │       │   └── LibroController.java
        │       ├── dto/
        │       │   └── Pagina.java
        │       ├── modelo/
        │       │   └── Libro.java
        │       ├── repository/
        │       │   └── LibroRepository.java
        │       └── service/
        │           └── LibroService.java
        └── resources/
            └── application.properties
```
