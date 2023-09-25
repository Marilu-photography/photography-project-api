const mongoose = require('mongoose');
const Products = require('../models/Products.model');
const User = require('../models/User.model');
const PRODUCTS = require('../data/products.json');
const USERS = require('../data/users.json');

require('../config/db.config');

mongoose.connection.once('open', () => {
    mongoose.connection.db
        .dropDatabase()
        .then(() => {
            console.log('Database dropped')
            return Products.create(PRODUCTS);
        })
        .then(productCreated => {
            productCreated.forEach(product => {
                console.log(`${product.name} has been created`)
            });
            return User.create(USERS);
        })
        .then(usersCreated => {
            usersCreated.forEach(user => {
                console.log(`${user.username} has been created`);
            });
            mongoose.disconnect();
        })
        .catch((err) => {
            console.error(err);
            mongoose.disconnect();
        })
        .finally(() => {
            console.log('Seeding process completed');
        });
            
        })