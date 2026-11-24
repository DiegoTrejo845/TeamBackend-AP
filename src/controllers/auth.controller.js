const ApiError = require('../utils/ApiError');
const ERROR_CODES = require('../utils/errorCodes');
const authService = require('../services/auth.service');

function login(req, res) {
  const { username, password } = req.body || {};
  if (typeof username !== 'string' || username.trim() === '' || typeof password !== 'string' || password === '') {
    throw ApiError.badRequest('Datos inválidos: username y password son obligatorios', ERROR_CODES.VALIDATION_ERROR);
  }
  res.status(200).json(authService.login(username.trim().toLowerCase(), password));
}

function me(req, res) {
  res.status(200).json(authService.getProfile(req.auth.userId));
}

function logout(req, res) {
  authService.logout(req.auth.token);
  res.status(204).end();
}

module.exports = { login, me, logout };
