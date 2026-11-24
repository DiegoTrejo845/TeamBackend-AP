const { Router } = require('express');

// Router principal del API, montado en /api/v1 desde src/app.js.
// Cada recurso registra aquí su propio router, por ejemplo:
//   router.use('/health', require('./health.routes'));
//   router.use('/speakers', require('./speakers.routes'));
const speakersRoutes = require('./speakers.routes');

router.use('/health', healthRoutes);
router.use('/speakers', speakersRoutes);
const router = Router();

module.exports = router;
