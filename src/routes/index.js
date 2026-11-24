const { Router } = require('express');
const authRoutes = require('./auth.routes');
const speakersRoutes = require('./speakers.routes');

// Router principal del API, montado en /api/v1 desde src/app.js.
const router = Router();

router.use('/auth', authRoutes);
router.use('/speakers', speakersRoutes);

module.exports = router;
