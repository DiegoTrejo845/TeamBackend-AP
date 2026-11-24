const { randomBytes, scryptSync, timingSafeEqual } = require('node:crypto');

// Contraseñas con scrypt + sal aleatoria. Formato guardado: scrypt$<sal>$<hash>.
const KEY_LENGTH = 64;

function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, KEY_LENGTH).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

function verifyPassword(password, stored) {
  const [scheme, salt, hash] = String(stored || '').split('$');
  if (scheme !== 'scrypt' || !salt || !hash) {
    return false;
  }
  const expected = Buffer.from(hash, 'hex');
  const actual = scryptSync(password, salt, expected.length);
  // Comparación en tiempo constante para no filtrar información por el tiempo de respuesta.
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

module.exports = { hashPassword, verifyPassword };
