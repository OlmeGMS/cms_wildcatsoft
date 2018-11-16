'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServicesSchema = Schema({
    title_service: String,
    lead_service: String,
    icon_service: String,
    subtitle: String,
    description_service: String,
    btn_service: String
});

module.exports = mongoose.model('Services', ServicesSchema);
