# CRUD de Libros — Spring Boot + PostgreSQL + Angular

> Aplicación **full stack en Java** para gestionar un catálogo de libros con **Spring Boot**, **Spring Data JPA**, **PostgreSQL**, **Angular** y **Docker Compose**.

![Java](https://img.shields.io/badge/Java-21-informational)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.3-informational)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-informational)
![Angular](https://img.shields.io/badge/Angular-20.2-informational)
![Docker](https://img.shields.io/badge/Docker-Compose-informational)

Este repositorio muestra una arquitectura sencilla y reutilizable de **CRUD REST con Java y Spring Boot**, persistencia relacional con PostgreSQL y un cliente web independiente en Angular. Está pensado como proyecto de referencia para estudiar desarrollo full stack moderno, APIs REST, JPA, validación, Docker y consumo de servicios desde Angular.

## Lo más importante

- Backend REST con Spring Boot y Java 21.
- Persistencia con Spring Data JPA y PostgreSQL.
- Frontend Angular separado del backend.
- Operaciones CRUD completas sobre libros.
- Búsqueda por título y autor.
- Paginación y validación de datos.
- PostgreSQL preparado mediante Docker Compose.
- Estructura pequeña y fácil de reutilizar como base para otros proyectos.

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

## Arquitectura

```text
Angular
   │ HTTP / REST
   ▼
Spring Boot
   │ Spring Data JPA
   ▼
PostgreSQL
```

## Estructura del repositorio

```text
.
├── crud/             # Backend Spring Boot + PostgreSQL
└── cliente-angular/  # Frontend Angular
```

## Inicio rápido

### 1. PostgreSQL

```bash
cd crud
docker compose up -d --wait
```

La configuración incluida crea:

- Base de datos: `biblioteca`
- Usuario: `postgres`
- Contraseña: `postgres`
- Puerto: `5432`

### 2. Backend Spring Boot

```bash
cd crud
mvn spring-boot:run
```

API principal:

```text
http://localhost:8080/api/libros
```

También se puede generar el JAR:

```bash
mvn clean package
java -jar target/*.jar
```

### 3. Cliente Angular

En otra terminal:

```bash
cd cliente-angular
npm install
npm start
```

Abre:

```text
http://localhost:4200
```

## Modelo de libro

Cada libro contiene campos como:

```text
id
titulo
autor
anio
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

## Para qué sirve este proyecto

Es un ejemplo práctico para aprender o reutilizar:

- **Spring Boot REST API** con Java.
- **Spring Data JPA** y persistencia relacional.
- Integración de **PostgreSQL con Docker**.
- Comunicación **Angular ↔ Spring Boot**.
- Separación clara entre backend y frontend.
- Estructura inicial para catálogos, inventarios y sistemas administrativos.

## Otros proyectos del mismo perfil

- [CRUD con Apache Solr + Angular](https://github.com/rodolfo99/CRUD-Solr-con-cliente-angular)
- [CRUD con Neo4j + Angular](https://github.com/rodolfo99/CRUD-LIBROS-NEO4J)
- [CRUD GraphQL + PostgreSQL + Angular](https://github.com/rodolfo99/crud-GraphQL-con-cliente-angular)
- [Spring Data GraphDB](https://github.com/rodolfo99/Spring-Data-GraphDB)
- [Marc2BF — MARC21 a BIBFRAME](https://github.com/rodolfo99/Marc2BF)

## Autor

**Rodolfo Valencia** — desarrollo de software, Java, Spring, Angular, bases de datos, tecnologías semánticas e inteligencia artificial.

GitHub: [@rodolfo99](https://github.com/rodolfo99)

## Temas relacionados

Spring Boot · Spring Data JPA · PostgreSQL · Angular · Java · TypeScript · REST API · CRUD · Docker · Maven · desarrollo full stack · catálogo de libros
