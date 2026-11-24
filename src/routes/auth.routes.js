const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const requireAuth = require('../middlewares/requireAuth');

const router = Router();

router.post('/login', authController.login);
router.get('/me', requireAuth, authController.me);
router.post('/logout', requireAuth, authController.logout);

module.exports = router;
