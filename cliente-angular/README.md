# Cliente Angular PostgreSQL v7

Versión simplificada y corregida para el CRUD PostgreSQL.

## Cambio principal

Se eliminó completamente el cuadro de confirmación de JavaScript.

Ahora, al pulsar **Eliminar**, el flujo es directo:

```text
clic en Eliminar
      ↓
DELETE /api/libros/{id}
      ↓
HTTP 204
      ↓
GET /api/libros
      ↓
tabla actualizada
```

## Trazas

En la consola del navegador (`F12`) se verán mensajes como:

```text
[ELIMINAR] CLICK recibido. ID: 7, título: java
[ELIMINAR] DELETE /api/libros/7
[ELIMINAR] DELETE terminado. ID: 7, HTTP: 204
[ELIMINAR] Recargando catálogo
```

## Ejecutar

```bash
npm install
npm start
```

Backend:

```text
http://localhost:8080
```

Frontend:

```text
http://localhost:4200
```
