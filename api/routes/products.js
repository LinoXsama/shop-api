const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
   res.status(200).json({
      message: 'Handle products GET request'
   });
});

router.post('/', (req, res, next) => {
   res.status(201).json({
      message: 'Handle products POST request'
   });
});

// route permettant de récupérer un produit par son Id

router.get('/:productId', (req, res, next) => {
   const id = req.params.productId;

   if(id === 'special') {
      res.status(200).json({
         message: 'Product Id is equal to special !',
         id: id
      });
   } else {
      res.status(200).json({
         message: 'You passed a simple product ID !',
         id: id
      });
   }
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