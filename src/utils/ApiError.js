const ERROR_CODES = require('./errorCodes');

// Error controlado: lleva el estado HTTP y el código que el manejador convierte en JSON.
class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }

  static badRequest(message, code = ERROR_CODES.VALIDATION_ERROR) {
    return new ApiError(400, code, message);
  }

  static notFound(message, code = ERROR_CODES.ROUTE_NOT_FOUND) {
    return new ApiError(404, code, message);
  }

  static conflict(message, code) {
    return new ApiError(409, code, message);
  }

  static internal(message = 'Error interno del servidor') {
    return new ApiError(500, ERROR_CODES.INTERNAL_ERROR, message);
  }
}

module.exports = ApiError;