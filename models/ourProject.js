'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OurProjectSchema = Schema({
  title_ourProject: String,
  image_ourProject: String,
  tag_ourProject: String
});

module.exports = mongoose.model('OurProject', OurProjectSchema);
