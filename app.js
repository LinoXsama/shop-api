const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));

// CORS management
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

   if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');

      return res.status(200).json({});
   }

   next();
});

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://merlinmigan:' + process.env.MONGO_ATLAS_PW + '@node-rest-shop.5xrrn.mongodb.net/?retryWrites=true&w=majority&appName=node-rest-shop');

// Routes which handle requests
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// middleware error handler 1/2
app.use((req, res, next) => {
   const error = new Error('Not found');
   error.status = 404;
   next(error);
});

// middleware error handler 2/2
app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
      error: {
         message: error.message,
      }
   });
});

module.exports = app;