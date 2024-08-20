const express = require('express');
const router = express.Router();

const Order = require('./api/models/orders');

// 1/ route get classique
// router.get('/', (req, res, next) => {
//    Order
//       .find()
//       .select('product quantity id')
//       .exec()
//       .then(docs => {
//          res.status(200).json({
//             count: docs.length,
//             orders: docs.map(doc => {
//                return {
//                   id: doc._id,
//                   product: doc.product,
//                   quantity: doc.quantity,
//                   request: {
//                      type: "GET",
//                      url: "http://localhost:3000/orders/" + doc._id
//                   }
//                }
//             })
//          });
//       })
//    .catch(err => {
//       res.status(500).json({
//          error: err
//       });
//    });
// });

// 2/ route get avec un middleware de gestion des erreurs
// router.get('/', (req, res, next) => {
//    Order
//       .find()
//       .select('product quantity _id')
//       .exec()
//       .then(docs => {
//          if (docs.length === 0) {
//             const error = new Error("Aucune commande n'a été trouveé !");
//             error.status = 404;
//             return next(error);
//          }

//          res.status(200).json({
//             count: docs.length,
//             orders: docs.map(doc => {
//                return {
//                   id: doc._id,
//                   product: doc.product,
//                   quantity: doc.quantity,
//                   request: {
//                      type: 'GET',
//                      url: 'http://localhost:3000/orders/' + doc._id
//                   }
//                };
//             })
//          });
//       })
//    .catch(err => {
//       next(err);
//    })
// });

// // middleware de gestion des erreurs
// router.use((error, req, res, next) => {
//    res.status(error.status || 500);
//    res.json({
//       error: {
//          message: error.message
//       }
//    });
// });