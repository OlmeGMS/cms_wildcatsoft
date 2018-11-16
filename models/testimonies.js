'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestimoniesSchema = Schema({
  title_testimonies: String,
  lead_testimonies: String,
  image_testimonies: String,
  name_testimonies: String,
  text_testiminies: String
});

module.exports = mongoose.model('Testimonies', TestimoniesSchema);
