const ApiError = require('../utils/ApiError');
const ERROR_CODES = require('../utils/errorCodes');
const authService = require('../services/auth.service');

// Exige el header "Authorization: Bearer <token>" y deja en req.auth el usuario.
function requireAuth(req, res, next) {
  const header = req.get('Authorization');
  if (!header) {
    throw ApiError.unauthorized('Falta el header Authorization con el token', ERROR_CODES.MISSING_TOKEN);
  }
  const [scheme, token, extra] = header.trim().split(/\s+/);
  if (scheme !== 'Bearer' || !token || extra) {
    throw ApiError.unauthorized('El header Authorization debe tener el formato: Bearer <token>', ERROR_CODES.INVALID_TOKEN);
  }
  req.auth = { userId: authService.validateToken(token), token };
  next();
}

module.exports = requireAuth;
