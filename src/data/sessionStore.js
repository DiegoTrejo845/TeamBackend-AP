// Tokens de sesión en memoria: token -> { userId, expiresAt }.
// Se pierden al reiniciar el servidor, igual que el resto de los datos.
const tokens = new Map();

function createToken(token, userId, expiresAt) {
  tokens.set(token, { userId, expiresAt });
}

function findToken(token) {
  return tokens.get(token) || null;
}

function revokeToken(token) {
  return tokens.delete(token);
}

module.exports = { createToken, findToken, revokeToken };
