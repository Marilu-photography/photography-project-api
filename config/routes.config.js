const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const usersController = require('../controllers/users.controller')
const upload = require('../config/storage.config');

// MISC

router.get('/', (req, res, next) => {
    res.json({ message: 'Welcome to the API'});
});

// AUTH

router.post('/register', upload.single('avatar'), authController.register);
router.post('/login', authController.login);

//USER

router.get('/users/me', authMiddleware.isAunthenticated, usersController.getCurrentUser)

module.exports = router;