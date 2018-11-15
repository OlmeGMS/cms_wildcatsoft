'user strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SliderSchema = Schema({
  image_slider: String,
  text_slider: String,
  btn_slider: String,
  status: Boolean
});

module.exports = mongoose.model('Slider', SliderSchema);
