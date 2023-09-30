const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const usersController = require('../controllers/users.controller')
const upload = require('../config/storage.config');
const productsController = require('../controllers/products.controller');
const imagesController = require('../controllers/images.controller');

// MISC

router.get('/', productsController.list);

// PRODUCTS

router.get('/:id', productsController.prouctDetail);

// AUTH

router.post('/register', upload.single('avatar'), authController.register);
router.post('/login', authController.login);

//USER

router.get('/users/me', authMiddleware.isAunthenticated, usersController.getCurrentUser)

// IMAGES

router.post('/images/upload', upload.single('image'), imagesController.createImage); //poner middleware de autenticacion


module.exports = router;