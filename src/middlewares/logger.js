// Logger propio: registra método, ruta, código HTTP y tiempo de respuesta.
// Escucha el evento 'finish' para conocer el código final de la respuesta,
// incluidas las que terminan en error (404, 409, 500).
function logger(req, res, next) {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${elapsedMs.toFixed(1)} ms`
    );
  });

  next();
}

module.exports = logger;