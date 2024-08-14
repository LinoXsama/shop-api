const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

// Routes which handle requests
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// middleware handler 1/2
app.use((req, res, next) => {
   const error =  new Error('Not found');
   error.status = 404;
   next(error);
});

// middleware handler 2/2
app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
      error: {
         message: error.message
      }
   });
});

module.exports = app;