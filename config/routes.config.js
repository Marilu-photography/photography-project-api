const router = require('express').Router();

const upload = require('../config/storage.config');

const authMiddleware = require('../middlewares/auth.middleware');
const usersController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller');
const productsController = require('../controllers/products.controller');
const imagesController = require('../controllers/images.controller');
const miscController = require('../controllers/misc.controller');
const ordersController = require('../controllers/orders.controller');


// MISC
router.get('/editor/:id',authMiddleware.isAuthenticated, upload.single('imageUrl'), imagesController.editorTool);

//SEARCH ROUTE
router.get('/search', productsController.search);

// PRODUCTS
router.post('/create', authMiddleware.isAuthenticated, upload.single(`image`), productsController.create);
router.get('/', productsController.list);
router.patch('/products/:id', authMiddleware.isAuthenticated,upload.single(`image`), productsController.edit);
router.get('/products/:id', productsController.productDetail);
router.delete('/products/:id/', authMiddleware.isAuthenticated, productsController.deleteProduct);
router.post('/products/checkout',authMiddleware.isAuthenticated, productsController.createCheckoutSession);
router.get('/products/checkout/success/:id',authMiddleware.isAuthenticated, productsController.success);

// AUTH

router.post('/register', upload.single('avatar'), authController.register);
router.post('/login', authController.login);
router.get('/activate/:id', authController.activateUser);

//USER

router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)
router.get('/profile/:id', usersController.userProfile)
router.post('/profile/:userId', authMiddleware.isAuthenticated, upload.single('avatar'), usersController.edit);


// IMAGES
router.get('/images', imagesController.imagesList);
router.post('/images/upload', authMiddleware.isAuthenticated, upload.single('imageUrl'), imagesController.createImage);
router.delete('/images/:id/', authMiddleware.isAuthenticated, imagesController.deleteImage);
router.post('/images/:id/edited-image', authMiddleware.isAuthenticated,  upload.single('imageUrl'), imagesController.editImage);


// COMMENTS
router.get('/comments/list/:id', miscController.listComments);
router.post('/comments/create/:id', authMiddleware.isAuthenticated, miscController.createComment);
router.delete('/comments/delete/:id', authMiddleware.isAuthenticated, miscController.deleteComment);

// ORDERS

router.get('/orders', authMiddleware.isAuthenticated, ordersController.listOrders);

module.exports = router;