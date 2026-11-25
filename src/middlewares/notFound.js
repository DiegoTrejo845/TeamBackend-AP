const ApiError = require('../utils/ApiError');
const ERROR_CODES = require('../utils/errorCodes');

// Se monta después de todas las rutas: si ninguna respondió, la ruta no existe.
function notFound(req, res, next) {
  next(
    ApiError.notFound(
      `No existe la ruta ${req.method} ${req.originalUrl}`,
      ERROR_CODES.ROUTE_NOT_FOUND
    )
  );
}

module.exports = notFound;