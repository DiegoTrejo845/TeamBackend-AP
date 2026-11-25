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

module.exports = {
  listSpeakers,
  getSpeakerById,
};