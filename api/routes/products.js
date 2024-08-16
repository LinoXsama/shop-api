const express = require('express');
const router = express.Router();

// import mongoose models
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
   res.status(200).json({
      message: 'Handle products GET request'
   });
});

router.post('/', (req, res, next) => {
   const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
   });

   product
      .save()
      .then(result => {
         console.log(result);
      })
   .catch(err => console.log(err));

   res.status(201).json({
      message: 'Product created with POST request',
      createdProduct: product
   });
});

// route permettant de récupérer un produit par son Id

router.get('/:productId', (req, res, next) => {
   const id = req.params.productId;

   Product.findById(id)
      .exec()
      .then(doc => {
         console.log(doc);
         res.status(200).json(doc);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json({ error: err });
      });
});

// routes permettant de modifier ou de supprimer un produit

router.patch('/:productId', (req, res, next) => {
   res.status(200).json({
      message: 'Product updated !'
   });
});

router.delete('/:productId', (req, res, next) => {
   res.status(200).json({
      message: 'Product deleted !'
   });
});

module.exports = router;