const express = require('express');
const routes = require('./routes');
const logger = require('./middlewares/logger');


const app = express();
// Middlewares globales: se ejecutan en este orden antes de llegar a las rutas.
// El logger propio (EVH-12) se monta aquí, antes de express.json().

app.use(logger);
app.use(express.json());

// Todas las rutas del API viven bajo el prefijo /api/v1 (ver src/routes/index.js).
app.use('/api/v1', routes);

// Después de las rutas se montan, en este orden, el middleware 404 y el
// manejador centralizado de errores (EVH-6). Express 5 envía a este último
// cualquier excepción, incluidas las de controladores async.

module.exports = app;
