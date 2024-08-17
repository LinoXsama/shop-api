const express = require('express');
const router = express.Router();

// import mongoose models
const mongoose = require('mongoose');
const Product = require('../models/product');

// route allowing to get all products
router.get('/', (req, res, next) => {
   Product.find()
      .exec()
      .then(docs => {
         // if(docs.length > 0) {
            console.log('From database :', docs);
            res.status(200).json(docs);
         // } else {
         //    res.status(404).json({
         //       message: 'No entries found !'
         //    })
         // }
      })
   .catch(err => {
      console.log(err);
      res.status(500).json({
         error: err
      })
   });
});

// route allowing to create a product
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
         res.status(201).json({
            message: 'Product created with POST request',
            createdProduct: result
         });
      })
   .catch(err => {
      console.log(err);
      res.status(500).json({
         error: err
      });
   });
});

// route allowing to get a product by its ID
router.get('/:productId', (req, res, next) => {
   const id = req.params.productId;

   Product.findById(id)
      .exec()
      .then(doc => {
         if (doc) {
            console.log('From database :', doc);
            res.status(200).json(doc);
         } else {
            res.status(404).json({
               message: 'No valid entry found for this ID !'
            });
         }
      })
   .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
   });
});

// route allowing to update a product
router.patch('/:productId', (req, res, next) => {
   const id = req.params.productId;
   const updateOps = {};

   for(const ops of req.body) {
      updateOps[ops.propName] = ops.value;
   }

   Product.findOneAndUpdate({ _id: id }, { $set: updateOps }, { new: true })
      .exec()
      .then(result => {
         console.log(result);
         res.status(200).json(result);
      })
   .catch(err => {
      console.log(err);
      res.status(500).json({
         error: err
      });
   });
});

// route allowing to delete a product
router.delete('/:productId', (req, res, next) => {
   const id = req.params.productId;

   Product.deleteOne({ _id: id })
      .exec()
      .then(result => {
         console.log('The product with ID : ' + id + ', was successfully deleted !');
         res.status(200).json(result);
      })
   .catch(err => {
      console.log(err);
      res.status(500).json({
         error: err
      });
   });
});

module.exports = router;