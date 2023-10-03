const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const usersController = require('../controllers/users.controller')
const upload = require('../config/storage.config');
const productsController = require('../controllers/products.controller');
const imagesController = require('../controllers/images.controller');
const miscController = require('../controllers/misc.controller');

// MISC



// PRODUCTS
router.get('/', productsController.list);
router.get('/products/:id', productsController.prouctDetail);
router.post('/products/checkout',authMiddleware.isAuthenticated, productsController.createCheckoutSession);

// AUTH

router.post('/register', upload.single('avatar'), authController.register);
router.post('/login', authController.login);

//USER

router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)

// IMAGES

router.post('/images/upload', authMiddleware.isAuthenticated, upload.single('image'), imagesController.createImage);

// COMMENTS
//router.get("/products/:productId", miscController.getCommentsForProduct);
//router.post('/comments/:id', authMiddleware.isAuthenticated, miscController.createComment);
//router.delete("/comments/:id/delete", authMiddleware.isAuthenticated, miscController.deleteComment);

module.exports = router;