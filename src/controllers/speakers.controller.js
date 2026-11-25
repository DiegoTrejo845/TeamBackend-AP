const speakersService = require('../services/speakers.service');

// Los controladores solo traducen HTTP <-> servicio: la lógica vive en services/.
function list(req, res) {
  res.status(200).json(speakersService.listSpeakers());
}

function getById(req, res) {
  res.status(200).json(speakersService.getSpeakerById(req.params.id));
}

function create(req, res) {
  const speaker = speakersService.createSpeaker(req.body);
  res.status(201).location(`/api/v1/speakers/${speaker.id}`).json(speaker);
}

function update(req, res) {
  const speaker = speakersService.updateSpeaker(req.params.id, req.body);
  res.status(200).json(speaker);
}

module.exports = { list, getById, create, update };