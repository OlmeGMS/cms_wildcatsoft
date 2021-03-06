'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = Schema({
  image_team: String,
  name_team: String,
  job_team: String,
  description_team: String,
  facebook: String,
  twitter: String,
  linkedin: String,
  instagram: String
});

module.exports = mongoose.model('Team', TeamSchema);
