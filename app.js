const express = require('express');
const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

// Routes which handle requests
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;