const mongoose = require('mongoose');
const Products = require('../models/Products.model');
const User = require('../models/User.model');
const Images = require('../models/Images.model');
const PRODUCTS = require('../data/products.json');
const USERS = require('../data/users.json');
const IMAGES = require('../data/images.json');



require('../config/db.config');

mongoose.connection.once('open', () => {
    mongoose.connection.db
        .dropDatabase()
        .then(() => {
            console.log('Database dropped');
            return User.create(USERS);
        })
        .then(usersCreated => {
            usersCreated.forEach(user => {
                console.log(`${user.username} has been created`);
            });

            // Encuentra el primer usuario con isAdmin a true
            const adminUser = usersCreated.find(user => user.isAdmin === true);

            if (!adminUser) {
                throw new Error('No admin user found.');
            }

            // Crea productos solo con el usuario admin
            const productsWithAdminAsAuthor = PRODUCTS.map(product => {
                return { ...product, owner: adminUser._id };
            });

            return Products.create(productsWithAdminAsAuthor);
        })
        .then(productCreated => {
            productCreated.forEach(product => {
                console.log(`${product.name} has been created`);
            });

            // Crea imágenes con varios usuarios
            const imagesAuthorIds = IMAGES.map(image => {
                const userMatch = usersCreated.find(user => user.username === image.author);

                if (userMatch) {
                    return { ...image, author: userMatch._id };
                }

                return image;
            });

            return Images.create(imagesAuthorIds);
        })
        .then(imagesCreated => {
            imagesCreated.forEach(image => {
                console.log(`${image.name} has been created`);
            });

            mongoose.disconnect();
            console.log('Seeding process completed');
        })
        .catch(err => {
            console.error(err);
            mongoose.disconnect();
            console.log('Seeding process failed');
        });
});
