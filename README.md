# EventHub API

API RESTful desarrollada con Node.js y Express 5 para la gestión de eventos y ponentes (Speakers), estructurada en capas y con almacenamiento en memoria precargado mediante semillas de datos.

## Requisitos previos

- **Node.js** (v18 o superior)
- **npm**
- **Postman** o **Postman CLI** (opcional, para ejecutar la suite de pruebas)

## Instalación y configuración

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/DiegoTrejo845/TeamBackend-AP.git](https://github.com/DiegoTrejo845/TeamBackend-AP.git)
   cd TeamBackend-AP
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto tomando como base `.env.example` (si existe) con las variables del Sprint 1:
   ```env
   PORT=3000
   NODE_ENV=development
   ```

## Scripts disponibles

- **Iniciar en modo desarrollo (con recarga automática mediante nodemon):**
  ```bash
  npm run dev
  ```
- **Iniciar en modo producción:**
  ```bash
  npm start
  ```

## Endpoints del Sprint 1

Base: `http://localhost:3000/api/v1`

| Método | Ruta | Respuesta correcta | Errores |
|---|---|---|---|
| GET | /health | 200 | - |
| GET | /speakers | 200 | - |
| GET | /speakers/:id | 200 | 404 SPEAKER_NOT_FOUND |
| POST | /speakers | 201 + Location | 400 VALIDATION_ERROR, 409 EMAIL_ALREADY_EXISTS |
| PUT | /speakers/:id | 200 | 400, 404, 409 |
| DELETE | /speakers/:id | 204 | 404, 409 SPEAKER_HAS_EVENTS |

Todos los errores responden: `{ "error": { "status", "code", "message", "timestamp" } }`.

### Probar con Postman

1. Importa `postman/EventHub.postman_collection.json` y `postman/EventHub.local.postman_environment.json`.
2. Selecciona el environment **EventHub Local**.
3. Reinicia el servidor (`npm run dev`) para volver a los datos del seed.
4. Clic derecho en la colección -> **Run collection** -> **Run**.

## Equipo y flujo de trabajo

| Integrante | Rol en Sprint 1 |
|---|---|
| Diego Uriel Pérez Trejo | Product Owner |
| Fernanda De la Rosa | Scrum Master |
| Nathan Emiliano Zúñiga Avilés | QA |
| Karen Ramírez | Desarrollo (PO en Sprint 2) |
| Efraín Nieves Hernández | Desarrollo |
| Diego Díaz | Desarrollo |
| Gabriel | Desarrollo |

- **Ramas:** `main` (estable) -> `develop` (integración) -> `feature/EVH-n-descripcion` (una por historia de JIRA).
- **Commits:** `tipo(scope): EVH-n mensaje`, por ejemplo `feat(speakers): EVH-30 crear ponente con email único`.
- Todo entra a `develop` por PR con 1 aprobación.