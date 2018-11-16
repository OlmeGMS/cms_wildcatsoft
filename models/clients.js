'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
  image_client: String
});

module.exports = mongoose.model('Client', ClientSchema);
