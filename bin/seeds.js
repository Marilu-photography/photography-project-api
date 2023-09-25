const mongoose = require('mongoose');
const Products = require('../models/Products.model');
const PRODUCTS = require('../data/products.json');

require('../config/db.config');


mongoose.connection.once('open', () => {
    mongoose.connection.db
        .dropDatabase()
        .then(() => {
            console.log('Database dropped')
            return Products.create(PRODUCTS);
        })
        .then(productCreated => 
            productCreated.forEach(product => {
                console.log(`${product.name} has been created`)
            }))
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            mongoose.disconnect()
        })

})