const createHttpError = require('http-errors');
const Product = require('../models/Products.model');
const { StatusCodes } = require('http-status-codes');
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Comment = require('../models/Comment.model');




module.exports.create = (req, res, next) => {
  
  
  const data = {
    ...req.body,
    owner: req.currentUser,
    image: req.file ? req.file.path : undefined,
};
  // aquí ira lo delos archivos

  Product.create( data )
    .then(product => res.status(201).json(product))
    .catch(next);
}


module.exports.list = (req, res, next) => {
    Product.find()
      .sort({ createdAt: -1 })
      .then(products => res.status(StatusCodes.OK).json(products))
      .catch(next)
  }

  module.exports.productDetail = (req, res, next) => {
    Product.findById(req.params.id)
      .then(product => res.status(StatusCodes.OK).json(product))
      .catch(next)
  }

  
  module.exports.edit = (req, res, next) => {
    
     const data = {
      ...req.body,
      owner: req.currentUser,
      image: req.file ? req.file.path : undefined,
    };
  
  
    Product.findByIdAndUpdate(req.params.id, data, { new: true })
      .then(product => res.status(StatusCodes.OK).json(product))
      .catch(next);
  }

  module.exports.deleteProduct = (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
      .then(() => res.status(StatusCodes.NO_CONTENT).send())
      .catch(next)
  }


  module.exports.createCheckoutSession = async (req, res, next) => {
    const products = req.body;

/*     {
      "_id": "651d93bee272965521ef133c",
      "name": "Cámara Nikon D850",
      "image": "https://tienda.nikonistas.com/es/img2/2021/02/webfrontal-solo-cuerpo-02_nikon_dslr_d850_zs_950x807_950x807.jpg",
      "description": "Cámara DSLR de alta resolución de Nikon",
      "price": 1999.99,
      "category": "Camera",
      "condition": "New",
      "brand": "Nikon",
      "model": "D850",
      "availability": true,
      "cameraType": "DSLR",
      "lensType": "Prime",
      "accessoryType": "Battery",
      "__v": 0,
      "id": "651d93bee272965521ef133c",
      "quantity": 1,
      "itemTotal": 1999.99
    } */

     console.log(products);

    const lineProducts = products.map(product => {
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.image]
          },
          unit_amount: parseFloat((product.price * 100).toFixed(2)),
        },
        quantity: product.quantity,
      }
    });
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineProducts,
      mode: 'payment',
      success_url: `${process.env.APP_WEB}/cart?success=true`,
      cancel_url: `${process.env.APP_WEB}/cart?canceled=true`,
    });
  
    res.json({url: session.url});
  }

  // controller de comentarios

  module.exports.getComments = (req, res, next) => {
    Comment.find({ product: req.params.id })
      .populate('user')
      .then(comments => res.status(StatusCodes.OK).json(comments))
      .catch(next);
  }

module.exports.doComments = (req, res, next) => {
   const data = {
     ...req.body,
      user: req.currentUser,
      product: req.params.id,
    };
    Comment.create(data)

    .then(comment => res.status(201).json(comment))
    .catch(next);
}
