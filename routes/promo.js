'use strict'

var express = require('express');
var PromoController = require('../controllers/promo');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/promo/:id', md_auth.ensureAuth, PromoController.getPromo);
api.post('/promo', md_auth.ensureAuth, PromoController.savePromo);
api.get('/promos/:page?', md_auth.ensureAuth, PromoController.getPromos);
api.get('/promos-list', PromoController.getListPromo);
api.put('/promo/:id', md_auth.ensureAuth, PromoController.updatePromo);
api.delete('/promo/:id', md_auth.ensureAuth, PromoController.deletePromo);

module.exports = api;
