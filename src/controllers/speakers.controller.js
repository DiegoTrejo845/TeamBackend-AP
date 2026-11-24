const speakersService = require('../services/speakers.service');

// Los controladores solo traducen HTTP <-> servicio: la lógica vive en services/.

function list(req, res) {
  res.status(200).json(speakersService.listSpeakers());
}

function getById(req, res) {
  res.status(200).json(speakersService.getSpeakerById(req.params.id));
}

module.exports = { list, getById };