const ApiError = require('../utils/ApiError');
const ERROR_CODES = require('../utils/errorCodes');

const REQUIRED_FIELDS = ['nombre', 'email', 'institucion', 'especialidad'];
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Valida el cuerpo de POST y PUT /speakers. Si algo falla responde 400;
// si todo está bien, deja en req.body solo los campos permitidos y limpios.
function validateSpeaker(req, res, next) {
  const body = req.body;

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw ApiError.badRequest(
      'El cuerpo debe ser un objeto JSON con los datos del ponente',
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  const errors = [];

  for (const field of REQUIRED_FIELDS) {
    if (typeof body[field] !== 'string' || body[field].trim() === '') {
      errors.push(`${field} es obligatorio`);
    }
  }

  if (
    typeof body.email === 'string' &&
    body.email.trim() !== '' &&
    !EMAIL_REGEX.test(body.email.trim())
  ) {
    errors.push('email no tiene un formato válido');
  }

  if (errors.length > 0) {
    throw ApiError.badRequest(
      `Datos inválidos: ${errors.join('; ')}`,
      ERROR_CODES.VALIDATION_ERROR
    );
  }

  req.body = {
    nombre: body.nombre.trim(),
    email: body.email.trim().toLowerCase(),
    institucion: body.institucion.trim(),
    especialidad: body.especialidad.trim(),
  };

  next();
}

module.exports = validateSpeaker;