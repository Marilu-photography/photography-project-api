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
            return Products.create(PRODUCTS);
        })
        .then(productCreated => {
            productCreated.forEach(product => {
                console.log(`${product.name} has been created`);
            });
            return User.create(USERS);
        })
        .then(usersCreated => {
            usersCreated.forEach(user => {
                console.log(`${user.username} has been created`);
            });
            const imagesAuthorIds = IMAGES.map(image => {
                const userMatch = usersCreated.find((user) => {
                    user.username === image.author
                });
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