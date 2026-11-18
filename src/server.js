require('dotenv').config({ quiet: true });

const app = require('./app');

const PORT = Number(process.env.PORT) || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, (error) => {
  if (error) {
    console.error(`No se pudo iniciar el servidor en el puerto ${PORT}: ${error.message}`);
    process.exit(1);
  }
  console.log(`EventHub API escuchando en http://localhost:${PORT}/api/v1 (${NODE_ENV})`);
});

module.exports = server;
