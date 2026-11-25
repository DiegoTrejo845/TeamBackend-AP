const { Router } = require('express');
const speakersController = require('../controllers/speakers.controller');

const router = Router();

router.get('/', speakersController.list);
router.get('/:id', speakersController.getById);

module.exports = router;