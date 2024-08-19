const express = require('express');
const router = express.Router();

// import mongoose models
const mongoose = require('mongoose');
const Product = require('../models/product');

// route allowing to get all products
router.get('/', (req, res, next) => {
   Product.find()
      .select('name price _id')
      .exec()
      .then(docs => {
         const response = {
            count: docs.length,
            products : docs.map(doc => {
               return {
                  name: doc.name,
                  price: doc.price,
                  _id: doc._id,
                  request: {
                     type: 'GET',
                     url: 'http://localhost:3000/products/' + doc._id
                  }
               }
            })
         };
         
         res.status(200).json(response);
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
            message: 'Product created successfully !',
            createdProduct: {
               name: result.name,
               price: result.price,
               id: result._id,
               request : {
                  type: "GET",
                  url: "http://localhost:3000/products/" + result._id,
               }
            }
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
      .select('name price _id')
      .exec()
      .then(doc => {
         if (doc) {
            console.log('Product found successfully :', doc);
            res.status(200).json({
               message: 'Product found successfully !',
               product: doc,
               request : {
                  type: "GET",
                  description: "Get a product by its ID",
                  url: "http://localhost:3000/products/" + doc._id
               }
            });
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
         res.status(200).json({
            message: "Product updated successfully",
            product : result,
            request: {
               type: "GET",
               url: "http://localhost:3000/products/" + result._id
            }
         });
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
         console.log('The product with ID : ' + id + ' was successfully deleted !');
         res.status(200).json({
            message: 'The product with ID : ' + id + ' was successfully deleted !',
         });
      })
   .catch(err => {
      console.log(err);
      res.status(500).json({
         error: err
      });
   });
});

module.exports = router;