'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PriceSchema = Schema({
  title_price: String,
  subtitle_price: String,
  price_price: String,
  item_price: String,
  btn_price: String
});

module.exports = mongoose.model('Price', PriceSchema);
