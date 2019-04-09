'use strict'

var express = require('express');
var PriceController = require('../controllers/price');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/price/:id', md_auth.ensureAuth, PriceController.getPrice);
api.post('/price', md_auth.ensureAuth, PriceController.savePrice);
api.get('/prices/:page?', md_auth.ensureAuth, PriceController.getPrices);
api.get('/pices-list', PriceController.getListPrices);
api.put('/price/:id', md_auth.ensureAuth, PriceController.updatePrice);
api.delete('/price/:id', md_auth.ensureAuth, PriceController.deletePrice);

module.exports = api;