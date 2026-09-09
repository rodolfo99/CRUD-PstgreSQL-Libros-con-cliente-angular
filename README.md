# CRUD de Libros con Spring Boot, PostgreSQL y Angular

Proyecto full stack de ejemplo para administrar un catálogo de libros mediante una API REST desarrollada con **Spring Boot**, **Spring Data JPA** y **PostgreSQL**, acompañada de un cliente web en **Angular**.

Este repositorio sirve como referencia práctica de un CRUD completo con Java, persistencia relacional, validación, Docker Compose y frontend Angular.

## Tecnologías

- Java 21
- Spring Boot 3.5.3
- Spring Web
- Spring Data JPA
- PostgreSQL 17
- Bean Validation
- Maven
- Docker Compose
- Angular 20.2
- TypeScript 5.9
- RxJS

## Estructura del repositorio

```text
.
├── crud/             # Backend Spring Boot + PostgreSQL
└── cliente-angular/  # Frontend Angular
```

## Backend

El backend expone una API REST para crear, consultar, actualizar, buscar y eliminar libros.

Ruta principal:

```text
http://localhost:8080/api/libros
```

Cada libro contiene campos como:

```text
id
titulo
autor
anio
```

### Ejecutar PostgreSQL con Docker

```bash
cd crud
docker compose up -d --wait
```

La configuración incluida crea:

- Base de datos: `biblioteca`
- Usuario: `postgres`
- Contraseña: `postgres`
- Puerto: `5432`

### Ejecutar Spring Boot

```bash
cd crud
mvn spring-boot:run
```

También se puede generar el JAR:

```bash
mvn clean package
java -jar target/*.jar
```

## Cliente Angular

El frontend consume la API REST y permite administrar los libros desde el navegador.

```bash
cd cliente-angular
npm install
npm start
```

Después abre:

```text
http://localhost:4200
```

## Funcionalidades

- Crear libros
- Listar libros
- Consultar libros
- Actualizar libros
- Eliminar libros
- Buscar por título o autor
- Paginación
- Validación de datos
- Persistencia en PostgreSQL
- Cliente web Angular

## Objetivo del proyecto

Mostrar una implementación sencilla y reutilizable de un **CRUD Java con Spring Boot, PostgreSQL y Angular**, separando claramente backend y frontend y facilitando su ejecución local mediante Docker.

## Temas relacionados

Spring Boot, Spring Data JPA, PostgreSQL, Angular, Java, TypeScript, REST API, CRUD, Docker, Maven, desarrollo full stack.
