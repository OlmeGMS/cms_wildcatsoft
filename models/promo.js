'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromoSchema = Schema({
    title_promo: String,
    subtitle_promo: String,
    btn_promo: String
});

module.exports = mongoose.model('Promo', PromoSchema);