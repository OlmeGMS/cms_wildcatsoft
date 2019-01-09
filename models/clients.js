'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    name_client: String,
    image_client: String
});

module.exports = mongoose.model('Client', ClientSchema);