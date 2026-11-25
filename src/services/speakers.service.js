const { speakers, events } = require('../data/store');
const ApiError = require('../utils/ApiError');
const ERROR_CODES = require('../utils/errorCodes');

// ---- Lectura y borrado (Diego Uriel: EVH-16 y EVH-10) ----

function listSpeakers() {
  return speakers.findAll();
}

function getSpeakerById(id) {
  const speaker = speakers.findById(id);
  if (!speaker) {
    throw ApiError.notFound(`No existe el ponente con id ${id}`, ERROR_CODES.SPEAKER_NOT_FOUND);
  }
  return speaker;
}

// ---- Alta y actualización (Efraín: EVH-9 y EVH-13) ----

function ensureEmailIsUnique(email, excludeId) {
  const taken = speakers.exists(
    (speaker) => speaker.email === email && speaker.id !== excludeId
  );
  if (taken) {
    throw ApiError.conflict(
      `Ya existe un ponente con el email ${email}`,
      ERROR_CODES.EMAIL_ALREADY_EXISTS
    );
  }
}

function createSpeaker(data) {
  ensureEmailIsUnique(data.email);
  return speakers.create(data);
}

function updateSpeaker(id, data) {
  const existing = speakers.findById(id);
  if (!existing) {
    throw ApiError.notFound(
      `No existe el ponente con id ${id}`,
      ERROR_CODES.SPEAKER_NOT_FOUND
    );
  }
  ensureEmailIsUnique(data.email, id);
  return speakers.update(id, data);
}

module.exports = {
  listSpeakers,
  getSpeakerById,
  createSpeaker,
  updateSpeaker,
};