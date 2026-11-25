const ApiError = require('../utils/ApiError');
const ERROR_CODES = require('../utils/errorCodes');

// Convierte cualquier error en ApiError.
function toApiError(err) {
  if (err instanceof ApiError) {
    return err;
  }

  // express.json() marca así un cuerpo que no es JSON válido.
  if (err.type === 'entity.parse.failed') {
    return ApiError.badRequest(
      'El cuerpo de la petición no es un JSON válido',
      ERROR_CODES.INVALID_JSON
    );
  }

  console.error(err);
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Error interno del servidor'
      : err.message || 'Error interno del servidor';

  return ApiError.internal(message);
}

// Manejador centralizado: 4 parámetros. Va al final, después del 404.
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const apiError = toApiError(err);

  res.status(apiError.status).json({
    error: {
      status: apiError.status,
      code: apiError.code,
      message: apiError.message,
      timestamp: new Date().toISOString(),
    },
  });
}

module.exports = errorHandler;