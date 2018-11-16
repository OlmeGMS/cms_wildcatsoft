'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = Schema({
  title_contact: String,
  description_contact: String,
  address_contact: String,
  phone_contact: String,
  email_contact: String,
  lat_contact: String,
  lng_contact: String,
});

module.exports = mongoose.model('Contact', ContactSchema);
