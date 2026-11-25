const { Router } = require('express');
const speakersController = require('../controllers/speakers.controller');
const validateSpeaker = require('../middlewares/validateSpeaker');

const router = Router();

router.get('/', speakersController.list);
router.get('/:id', speakersController.getById);
router.post('/', validateSpeaker, speakersController.create);

module.exports = router;