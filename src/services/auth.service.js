const { randomBytes } = require('node:crypto');
const { users } = require('../data/store');
const sessionStore = require('../data/sessionStore');
const { verifyPassword } = require('../utils/password');
const ApiError = require('../utils/ApiError');
const ERROR_CODES = require('../utils/errorCodes');

// Duración del token en minutos (TOKEN_TTL_MINUTES en .env; 15 por defecto).
const TOKEN_TTL_MS = (Number(process.env.TOKEN_TTL_MINUTES) || 15) * 60 * 1000;

// Quita la contraseña antes de regresar un usuario.
function toProfile(user) {
  const { passwordHash, ...profile } = user;
  return profile;
}

// Login básico (sin segundo factor): usuario + contraseña -> token Bearer.
// El mismo mensaje para usuario inexistente o contraseña incorrecta,
// para no revelar qué usuarios existen.
function login(username, password) {
  const user = users.findOne((item) => item.username === username);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    throw ApiError.unauthorized('Usuario o contraseña incorrectos', ERROR_CODES.INVALID_CREDENTIALS);
  }

  const token = randomBytes(32).toString('hex');
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  sessionStore.createToken(token, user.id, expiresAt);

  return {
    token,
    tokenType: 'Bearer',
    expiresIn: TOKEN_TTL_MS / 1000,
    expiresAt: new Date(expiresAt).toISOString(),
    user: toProfile(user),
  };
}

// Revisa un token y regresa el id de su usuario, o lanza 401.
function validateToken(token) {
  const session = sessionStore.findToken(token);
  if (!session) {
    throw ApiError.unauthorized('El token no es válido', ERROR_CODES.INVALID_TOKEN);
  }
  if (session.expiresAt <= Date.now()) {
    sessionStore.revokeToken(token);
    throw ApiError.unauthorized('El token expiró, inicia sesión de nuevo', ERROR_CODES.TOKEN_EXPIRED);
  }
  return session.userId;
}

function getProfile(userId) {
  const user = users.findById(userId);
  if (!user) {
    throw ApiError.unauthorized('El token no es válido', ERROR_CODES.INVALID_TOKEN);
  }
  return toProfile(user);
}

function logout(token) {
  sessionStore.revokeToken(token);
}

module.exports = { login, validateToken, getProfile, logout };
