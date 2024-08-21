const express = require('express');
const router = express.Router();

const Order = require('../models/orders');
const Product = require('../models/product');

const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
   Order
      .find()
      .select('product quantity _id')
      .populate('product', 'name')
      .exec()
      .then(docs => {
         res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
               return {
                  _id: doc._id,
                  product: doc.product,
                  quantity: doc.quantity,
                  request: {
                     type: "GET",
                     url: "http://localhost:3000/orders/" + doc._id
                  }
               }
            })
         });
      })
      .catch(err => {
         res.status(500).json({
            error: err
         });
      });
});

router.get('/:orderId', async (req, res, next) => {
   try {
      const id = req.params.orderId;
      const order = await Order.findById(id).select('quantity product _id').populate('product', 'name price');

      if(!order) {
         return res.status(404).json({
            message: "Aucune commande ne correspond à l'ID " + id
         })
      }

      res.status(200).json({
         message:'La commande N° ' + id + ' a été trouvée !',
         details: order
      });

   } catch (err) {
      console.log(err);
      res.status(500).json({
         error: err.message || err
      });
   }
});

router.post('/', async (req, res) => {
   try {
      const product = await Product.findById(req.body.productId);

      if (!product) {
         return res.status(404).json({
            message: "Aucun produit n'a été trouvé pour cet ID !"
         });
      }

      const order = new Order({
         _id: new mongoose.Types.ObjectId(),
         quantity: req.body.quantity,
         product: req.body.productId
      });

      const result = await order.save();

      res.status(201).json({
         message: "Order created successfully !",
         ordersDetails: {
            _id: result._id,
            quantity: result.quantity,
            product: result.product
         }
      });

   } catch (err) {
      console.log(err);
      res.status(500).json({
         error: err.message || err
      });
   }
});

router.delete('/:orderId', (req, res, next) => {
   const id = req.params.orderId;

   Order.remove({ _id: id })
      .exec()
      .then(result => {
         res.status(200).json({
            message: 'La commande ' + id + 'a bien été supprimée !'
         });
      })
   .catch(err => {
      error: err
   })
});

module.exports = router;