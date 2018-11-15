'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AboutSchema = Schema({
  title_about: String,
  lead_about: String,
  icon_about: String,
  subtitle_about: String,
  description_about: String,
  btn_about: String
});
